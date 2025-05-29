import {FETCH_ERROR_MESSAGES} from 'src/constants';

export class CustomError {
  status: number;
  constructor(status: number) {
    this.status = status;
  }

  toString() {
    const errorMessage = FETCH_ERROR_MESSAGES[`${this.status}`];

    return `${this.status}: ${errorMessage}`;
  }
}
