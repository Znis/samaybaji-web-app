import { fetchDishByMenuItemId } from '../../api-routes/dish';
import { fetchTargetReviews } from '../../api-routes/review';
import Toast from '../../components/toast';
import { ReviewTargetType } from '../../enums/review';
import { IDish } from '../../interfaces/dish';
import { IReview } from '../../interfaces/review';
import { navigate } from '../../router';
import DishInfo from './section/dishInfo';
import DishReview from './section/dishReview';

export default class DishDetailLayout {
  static element: HTMLElement = document.createElement('div');
  static async init(id: string): Promise<HTMLElement> {
    this.element.setAttribute('id', 'dish-detail-page');
    this.element.innerHTML = '';
    this.fetchData(id);

    return this.element;
  }
  static async fetchData(menuItemId: string) {
    try {
      const dishDetail = (await fetchDishByMenuItemId(menuItemId)) as IDish;
      const reviews = await fetchTargetReviews(dishDetail.id);
      this.render(dishDetail, reviews);
    } catch (error) {
      console.log(error);
      history.pushState(null, '', '/');
      navigate('/');
      Toast.show('No Dish Detail Found');
    }
  }
  static render(dishDetail: IDish, reviews: IReview[]) {
    this.element.appendChild(DishInfo.init(dishDetail));
    this.element.appendChild(DishReview.init(reviews, dishDetail.id));
  }
}
