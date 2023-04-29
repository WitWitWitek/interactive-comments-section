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
  setIsReplyFormOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface CommentProps {
  comment: CommentType,
  isReply: boolean,
  setReplyFormAsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUserContext {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}

type DeleteResponse = {
  message: string
};

type DeleteVariables = { id: string, isReply: boolean };
