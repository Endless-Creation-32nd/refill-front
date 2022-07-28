import { ChangeEvent, FormEvent, ReactElement, useRef, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';

import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Modal from '../../components/modal';
import Loading from '../../components/loading';

import { IWord } from '../../types/IWord';
import { IWordItem } from '../../types/IWordItem';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { errorTypes } from '../../utils';

interface IForm {
  title: string;
  author: string;
  original: string;
  file: File | undefined;
}

export const fetchWords = async (url: string) => {
  const {
    data: {
      channel: { item },
    },
  } = await axios.get(url);
  return item || [];
};

const PAGE_SIZE = 10;

const TranscriptionForm = () => {
  const initialForm = {
    title: '',
    author: '',
    original: '',
    file: undefined,
  };

  const [form, setForm] = useState<IForm>(initialForm);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [word, setWord] = useState('');

  const [showToggleWordModal, setShowToggleWordModal] = useState(false);

  const [selectedWord, setSelectedWord] = useState<IWordItem | null>(null);
  const [wordList, setWordList] = useState<IWord[]>([]);

  const router = useRouter();
  const { query } = router;

  const {
    data: wordData,
    error,
    size,
    setSize,
  } = useSWRInfinite<IWordItem[]>(
    (index) =>
      word
        ? encodeURI(
            `/opendict/search?key=${
              process.env.NEXT_PUBLIC_OPENDICT_API_KEY
            }&q=${word}&req_type=json&num=${PAGE_SIZE}&start=${index + 1}`
          )
        : null,
    fetchWords
  );

  const encodeFileToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    setForm((prev) => ({
      ...prev,
      file: files?.[0],
    }));
    const fileBlob = e.target.files?.[0];

    if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
          resolve(reader.result);
        };
      });
    }
  };

  const onChangeWord = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    setSelectedWord(null);
  };

  const toggleWordModal = () => {
    setShowToggleWordModal((prev) => !prev);
  };

  const onCloseModal = () => {
    setShowToggleWordModal(false);
    handleReset();
  };

  const handleReset = () => {
    setWord('');
    setSelectedWord(null);
  };

  const onClickSelectWord = (wordItem: IWordItem) => {
    if (!selectedWord) {
      setSelectedWord(wordItem);
      return;
    }
    setSelectedWord((prev) => {
      if (!prev) {
        return wordItem;
      }
      return prev.sense[0].target_code !== wordItem.sense[0].target_code
        ? wordItem
        : null;
    });
  };

  const onAddWord = () => {
    if (!selectedWord) {
      alert('단어를 선택해주세요.');
      return;
    }

    const { word, sense } = selectedWord;
    alert(`${word}가 추가되었습니다.`);
    setWordList((prev) =>
      prev.concat({
        word,
        definition: sense[0].definition,
        pos: sense[0].pos || '',
        cat: sense[0].cat || '',
      })
    );
    onCloseModal();
  };

  const onSubmitTranscription = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { title, author, original, file } = form;

    if (!query.groupId) {
      alert('그룹 정보를 받아올 수 없습니다.');
      router.replace('/');
    }

    if (!file) {
      alert('최소 1개의 필사 사진을 추가해야합니다.');
      return;
    }
    if (!title || !title.trim()) {
      alert('글의 제목을 작성해주세요.');
      return;
    }
    if (!author || !author.trim()) {
      alert('글쓴이를 작성해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axiosPrivate
      .post('/api/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        const {
          data: { data },
        } = response;
        if (response.status === 201) {
          return data;
        }
      })
      .then(({ url: imageUrl }: { url: string }) => {
        const requestBody = {
          title,
          author,
          original: original ? original.trim() : null,
          imageUrl,
          isGroup: true,
          groupId: query.groupId,
          wordList: wordList.length > 0 ? wordList.slice() : null,
        };
        axiosPrivate
          .post(`/api/transcription`, requestBody)
          .then(() => {
            alert('필사 인증이 정상적으로 등록되었습니다.');
            router.back();
            setForm(initialForm);
            setPreviewImage('');
            setWordList([]);
          })
          .catch((error) => {
            const {
              data: { errorType },
            } = error.response;
            if (errorType === errorTypes.E026) {
              alert('해당 그룹의 회원이 아닙니다.');
            }
          });
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E999) {
          alert('서버 내부 오류입니다.');
          router.replace('/');
        }
      });
  };

  const middleChild = <h1 className='tab-middle-title'>필사 올리기</h1>;
  const rightChild = (
    <button
      type='submit'
      onClick={onSubmitTranscription}
      className='rounded-full bg-mint-main px-3 py-1 text-sm'
    >
      완료
    </button>
  );

  const words = wordData ? ([] as IWordItem[]).concat(...wordData) : [];
  const isLoadingInitialData = word && !wordData && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && wordData && typeof wordData[size - 1] === 'undefined');
  const isEmpty = wordData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (wordData && wordData[wordData.length - 1]?.length < PAGE_SIZE);

  return (
    <>
      <Head>
        <title>필사 올리기</title>
      </Head>
      <Header
        leftChild={<BackButton />}
        middleChild={middleChild}
        rightChild={rightChild}
        style={'bg-white'}
      />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>
          <form className='p-6'>
            <label htmlFor='file' className='cursor-pointer'>
              <span className='sr-only'>Choose profile photo</span>
              <input
                id='file'
                type='file'
                accept='image/*'
                name='file'
                onChange={encodeFileToBase64}
                className='m-auto hidden w-full text-sm'
              />
              <div
                className={`relative m-auto mb-5 rounded-lg ${
                  previewImage ? 'h-[300px]' : 'h-[225px]'
                } w-full bg-[#efefef]`}
              >
                {previewImage ? (
                  <>
                    <button
                      type='button'
                      onClick={toggleWordModal}
                      className='absolute bottom-3 right-3 z-10 rounded-[4px] bg-mint-main py-1 px-2 text-xs font-semibold text-white drop-shadow-lg'
                    >
                      단어 추가하기
                    </button>
                    <Image
                      src={previewImage}
                      alt='preview'
                      layout='fill'
                      objectFit='cover'
                      className='rounded-lg'
                    />
                  </>
                ) : (
                  <div className='flex h-full flex-col items-center justify-center rounded-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#1c1c1e'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                )}
              </div>
            </label>
            <label htmlFor='title'>
              <span>글 제목</span>
              <input
                type='text'
                name='title'
                id='title'
                placeholder='원본 글의 제목을 입력해주세요'
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                minLength={1}
                maxLength={30}
                className='mt-2 w-full rounded-lg border-[1px] py-2 px-3 text-sm'
              />
              <div className='flex justify-end text-sm text-[#666666]'>{`${form.title.length}/30`}</div>
            </label>

            <label htmlFor='author'>
              <span>글쓴이</span>
              <input
                type='text'
                name='author'
                id='author'
                placeholder='원본 글의 저자를 입력해주세요'
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                required
                minLength={1}
                maxLength={20}
                className='mt-2 w-full rounded-lg border-[1px] py-2 px-3 text-sm'
              />
              <div className='flex justify-end text-sm text-[#666666]'>{`${form.author.length}/20`}</div>
            </label>
            <label htmlFor='original'>
              <span>원문 공유</span>
              <textarea
                name='original'
                id='original'
                placeholder='다른 사람들을 위해 링크를 달아주세요'
                value={form.original}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, original: e.target.value }))
                }
                className='mt-2 w-full rounded-lg border-[1px] py-2 px-3 text-sm'
              ></textarea>
            </label>

            <section className='mt-4'>
              {wordList.length > 0 && (
                <>
                  <span>추가한 단어</span>
                  <ul className='mt-2'>
                    {wordList.map((word, index) => {
                      return (
                        <li key={index} className='mb-4'>
                          <dl>
                            <dt className='mb-2 w-min rounded-[4px] border border-black px-1 text-xs font-semibold'>
                              {word.word}
                            </dt>
                            <dd className='indent-2 text-sm'>
                              <span>{word.pos && `⌜${word.pos}⌟`}</span>{' '}
                              <span>{word.cat && `『${word.cat}』`}</span>{' '}
                              <span>{word.definition}</span>
                            </dd>
                          </dl>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </section>
          </form>
        </div>
      </main>

      <Modal show={showToggleWordModal} onCloseModal={onCloseModal}>
        <div className='w-full min-w-[280px] rounded-lg bg-white p-5'>
          <h3 className='mb-2 text-xl font-semibold'>단어 추가하기</h3>
          <p className='mb-4 text-sm text-[#666666]'>
            단어 뜻을 찾아 이미지에 추가하세요.
          </p>
          <div className='flex rounded-lg border-2 border-black p-3'>
            <input
              id='word'
              type='text'
              value={word}
              onChange={onChangeWord}
              placeholder='단어 검색하기'
              className='flex-1 text-sm'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>

          <section className='mb-2 flex max-h-[300px] min-h-[250px] flex-col'>
            {isLoadingInitialData && (
              <div className='m-auto'>
                <Loading />
              </div>
            )}
            {isEmpty && <p className='m-auto text-sm'>검색결과가 없습니다.</p>}
            <ul className='flex flex-col overflow-y-scroll'>
              {words.map((word, index) => {
                return (
                  <li
                    key={index}
                    className={`${
                      selectedWord?.sense[0].target_code ===
                      word.sense[0].target_code
                        ? 'bg-[#efefef]'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => onClickSelectWord(word)}
                      className='h-full w-full py-4 text-left'
                    >
                      <dl>
                        <dt className='font-semibold'>{word.word}</dt>
                        <dd className='text-sm'>
                          <span>
                            {word.sense[0].pos && `⌜${word.sense[0].pos}⌟`}
                          </span>{' '}
                          <span>
                            {word.sense[0].cat && `『${word.sense[0].cat}』`}
                          </span>{' '}
                          <span>{word.sense[0].definition}</span>
                        </dd>
                      </dl>
                    </button>
                  </li>
                );
              })}
              {wordData && (
                <button
                  disabled={isLoadingMore || isReachingEnd}
                  onClick={() => setSize(size + 1)}
                  className={`rounded-md px-2 py-1 ${
                    isLoadingMore || isReachingEnd
                      ? 'bg-light-gray text-white'
                      : 'bg-black text-mint-main'
                  }`}
                >
                  {isLoadingMore
                    ? '불러오는 중...'
                    : isReachingEnd
                    ? '더 이상 없음'
                    : '더 보기'}
                </button>
              )}
            </ul>
          </section>

          <section className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={onCloseModal}
              className='py-[10px] px-4'
            >
              취소
            </button>
            <button
              type='button'
              onClick={onAddWord}
              className='rounded-[4px] bg-mint-main py-[10px] px-4 text-black'
            >
              추가하기
            </button>
          </section>
        </div>
      </Modal>
    </>
  );
};

TranscriptionForm.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TranscriptionForm;
