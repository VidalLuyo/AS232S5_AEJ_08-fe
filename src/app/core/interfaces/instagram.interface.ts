export interface InstagramInterface {
  id?: number;
  username: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
  creationDate?: string;
  updateDate?: string;
  status?: string;
}
