export interface ITranscription {
  transcriptionId: number; //필사 ID
  transcriptionImage: string; // 필사  이미지
  title: string; //제목
  createdAt: string; //필사 작성 시간
  participation: {
    // 필사 작성자 정보
    memberId: 7; //memberID
    nickname: string; // 닉네임
    image: null; //프로필 이미지
    status: 'PARTICIPATE'; // 통일 시키기 위해 넣음
  };
  bookmarkCount: number; //북마크 카운트
  commentCount: number; //댓글 카운트
}
