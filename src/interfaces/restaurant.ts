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
  userID: string;
}
export interface ICreateRestaurantData {
  name: string;
  description: string;
  location: string;
  contactNumber: string;
  openHours: string;
  profilePic: string;
  coverPic: string;
  panNumber: string;
  userID: string;
}
export interface IEditRestaurantData {
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
