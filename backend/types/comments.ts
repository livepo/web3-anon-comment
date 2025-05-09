export interface CreateCommentBody {
  content: string;
  ipfsHash?: string;
  contentHash?: string;
  userId: string;
  parentId?: string;
  tagNames?: string[];
}

export interface VoteBody {
  commentId: string;
  userId: string;
}
