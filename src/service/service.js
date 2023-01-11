export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getData = (data) => {
    if (data) {
      return data;
    }
    return 'no data :(';
  };
  getId = (str) => {
    return str.substring(str.lastIndexOf('/') + 1);
  };

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllChar = async () => {
    const allChars = await this.getResource('/characters?page=5&pageSize=10');
    const response = allChars.map(this._transformChar);
    return response;
  };

  getCharById = async (id) => {
    const char = await this.getResource(`/characters/${id}`);
    return this._transformChar(char);
  };

  _transformChar = (char) => {
    const id = this.getId(char.url);
    return {
      id,
      name: this.getData(char.name),
      gender: this.getData(char.gender),
      born: this.getData(char.born),
      died: this.getData(char.died),
      culture: this.getData(char.culture),
    };
  };

  getAllBooks = async () => {
    const allBooks = await this.getResource('/books');
    return allBooks.map(this._transformBook);
  };

  getBookById = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  };

  _transformBook = (book) => {
    const id = this.getId(book.url);
    return {
      id,
      name: this.getData(book.name),
      numberOfPages: this.getData(book.numberOfPages),
      publisher: this.getData(book.publisher),
      released: this.getData(book.released),
    };
  };

  getAllHouses = async () => {
    const houses = await this.getResource('/houses');
    return houses.map(this._transformHouse);
  };
  getHouseById = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  };

  _transformHouse = (house) => {
    const id = this.getId(house.url);
    return {
      id,
      name: this.getData(house.name),
      region: this.getData(house.region),
      words: this.getData(house.words),
      titles: this.getData(house.titles),
      overlord: this.getData(house.overlord),
      ancestralWeapons: this.getData(house.ancestralWeapons),
    };
  };
}
