interface IRestaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  contactNumber: string;
  openHours: string;
  rating: number;
  profilePic: string;
  coverPic: string;
  panNumber: string;
  userId: string;
}
export interface ICreateRestaurant {
  name: string;
  description: string;
  location: string;
  contactNumber: string;
  openHours: string;
  profilePic: string;
  coverPic: string;
  panNumber: string;
}
export interface IEditRestaurant {
  name?: string;
  description?: string;
  location?: string;
  contactNumber?: string;
  openHours?: string;
  profilePic?: string;
  coverPic?: string;
  panNumber?: string;
}

export default IRestaurant;
