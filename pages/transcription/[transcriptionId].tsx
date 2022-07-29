import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import useSWR from 'swr';
import Sheet from 'react-modal-sheet';

import { IUser } from '../../types/IUser';
import { IProfile } from '../../types/IProfile';
import { IUserTranslation } from '../../types/IUserTranscription';

import { errorTypes } from '../../utils';
import fetchData from '../../utils/fetchData';
import { axiosPrivate } from '../../utils/axiosPrivate';

import BackButton from '../../components/BackButton';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import CustomAvatar from '../../components/CustomAvatar';

import Bookmark from '../../assets/bookmark.svg';
import FillBookmark from '../../assets/bookmark_fill.svg';
import Comment from '../../assets/comment.svg';

const TranscriptionDetail = () => {
  const { data: userData } = useSWR<IUser>('/api/auth', fetchData);
  const { data: profileData } = useSWR<IProfile>(
    userData ? `/api/member/${userData.memberId}` : null,
    fetchData
  );
  const router = useRouter();
  const { query } = router;
  const {
    data: transcriptionItem,
    mutate: mutateTranscription,
    error,
  } = useSWR<IUserTranslation>(
    query.transcriptionId
      ? `/api/transcription/${query.transcriptionId}`
      : null,
    fetchData
  );
  const [openComment, setOpenComment] = useState(false);

  const [comment, setComment] = useState('');

  if (error) {
    return null;
  }
  if (!transcriptionItem) {
    return (
      <div className='m-auto flex justify-center'>
        <Loading />
      </div>
    );
  }

  const onOpen = () => {
    setOpenComment(true);
  };
  const onClose = () => {
    setOpenComment(false);
  };

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.transcriptionId) {
      alert('유효하지 않은 필사 입니다.');
      router.replace('/');
      return;
    }
    if (!comment || !comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    axiosPrivate
      .post(`/api/transcription/${query.transcriptionId}/comment`, {
        content: comment,
      })
      .then((response) => {
        if (response.status === 200) {
          setComment('');
          mutateTranscription();
        }
      })
      .catch((error) => {});
  };

  const onClickBookMark = () => {
    if (!query.transcriptionId) {
      alert('유효하지 않은 필사 입니다.');
      router.replace('/');
      return;
    }
    if (transcriptionItem.isBookMark) {
      alert('이미 북마크에 저장하였습니다.');
      return;
    }
    axiosPrivate
      .post(`/api/transcription/${query.transcriptionId}/bookmark`)
      .then((response) => {
        mutateTranscription();
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E027) {
          alert('이미 북마크에 저장되어 있습니다.');
        }
      });
  };

  return (
    <>
      <div className='flex flex-col px-6'>
        {transcriptionItem && (
          <>
            <div className='relative h-[328px] w-full rounded-lg border'>
              <Image
                src={transcriptionItem.image}
                alt='필사 이미지'
                objectFit='contain'
                layout='fill'
                className='rounded-lg'
              />
            </div>
            <section className='divide-y'>
              <div className='flex gap-4 py-4'>
                <div className='flex flex-1 flex-col gap-1'>
                  <h3 className='text-xl font-semibold'>
                    {transcriptionItem.title}
                  </h3>
                  <div className='text-xs'>{transcriptionItem.author}</div>
                  {transcriptionItem.original && (
                    <a
                      className='break-all text-xs text-sky-500 underline'
                      target='_blank'
                      rel='noreferrer'
                      href={transcriptionItem.original}
                    >
                      {transcriptionItem.original}
                    </a>
                  )}
                </div>
                <div className='flex h-max'>
                  <button onClick={onOpen}>
                    <Comment />
                  </button>
                  <button onClick={onClickBookMark}>
                    {transcriptionItem.isBookMark ? (
                      <FillBookmark></FillBookmark>
                    ) : (
                      <Bookmark />
                    )}
                  </button>
                </div>
              </div>

              {transcriptionItem.wordList.map((word) => {
                return (
                  <div key={word.wordId} className='py-4'>
                    <div className='mb-2 w-max rounded-[4px] bg-black py-[2px] px-1 text-xs font-semibold text-mint-main'>
                      {word.word}
                    </div>
                    <div className='indent-2 text-sm'>
                      <span>{word.pos && `⌜${word.pos}⌟`}</span>{' '}
                      <span>{word.cat && `『${word.cat}』`}</span>{' '}
                      <span>{word.definition}</span>
                    </div>
                  </div>
                );
              })}
            </section>
            <Sheet
              isOpen={openComment}
              snapPoints={[0.5, 0.3]}
              initialSnap={0}
              onClose={onClose}
            >
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                  <div className='h-full overflow-auto pb-[81px]'>
                    <ul className='divide-y border'>
                      {transcriptionItem.commentList.map((commentItem) => {
                        return (
                          <li
                            key={commentItem.commentId}
                            className='flex items-center gap-4 px-6 py-4'
                          >
                            <CustomAvatar
                              image={commentItem.image}
                              nickname={commentItem.nickname}
                              width={'w-10'}
                              height={'h-10'}
                              size={'40'}
                            />
                            <div className='flex flex-1 flex-col'>
                              <div>
                                <span className='text-xs font-bold'>
                                  {commentItem.nickname}
                                </span>
                                <span className='ml-2 text-xs text-middle-gray'>
                                  {dayjs(commentItem.createdAt).format(
                                    'YYYY.MM.DD'
                                  )}
                                </span>
                              </div>
                              <p className='text-sm'>{commentItem.content}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <form
                      onSubmit={onSubmitComment}
                      className='fixed inset-x-0 bottom-0 flex items-center gap-4 border-t bg-white py-5 px-6'
                    >
                      <label htmlFor='comment'>
                        {profileData && (
                          <CustomAvatar
                            image={profileData.image}
                            nickname={profileData.nickname}
                            width={'w-10'}
                            height={'h-10'}
                            size={'40'}
                          />
                        )}
                      </label>
                      <div className='flex flex-1 rounded-md border'>
                        <input
                          id='comment'
                          type='text'
                          placeholder='댓글을 입력해주세요.'
                          value={comment}
                          onChange={onChangeComment}
                          autoComplete='off'
                          className='flex-1 rounded-md px-4 py-2 text-sm'
                        />
                        <button
                          type='submit'
                          disabled={!comment}
                          className={`px-2 ${
                            comment
                              ? 'text-mint-main'
                              : 'cursor-not-allowed text-middle-gray'
                          }`}
                        >
                          게시
                        </button>
                      </div>
                    </form>
                  </div>
                </Sheet.Content>
              </Sheet.Container>

              <Sheet.Backdrop onTap={onClose} />
            </Sheet>
          </>
        )}
      </div>
    </>
  );
};

TranscriptionDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Header leftChild={<BackButton />} style={'bg-white'} />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>{page}</div>
      </main>
    </Layout>
  );
};
export default TranscriptionDetail;
