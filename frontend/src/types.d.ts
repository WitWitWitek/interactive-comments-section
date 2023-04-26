interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replyingTo?: string;
  replies?: CommentType[];
}

interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
  userId: string;
}

interface NewCommentFormProps {
  isReplyForm: boolean;
  parentId?: string;
}

interface CommentProps {
  comment: CommentType,
  setReply?: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUserContext {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}
