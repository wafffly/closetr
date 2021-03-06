import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  sortOptions,
  filterOptions,
  mockClothingOne,
  mockClosetList,
  mockUserOne,
  mockUserTwo,
  mockOutfitClothingList
} from './objects';

/*
Contains mock services used for
testing purposes.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceMock {
  baseUrl = `http://localhost:8080/`;
  currentUserValue = mockUserOne;
  login = () => of(true);
  logout = () => { return };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceNoUserMock {
  baseUrl = `http://localhost:8080/`;
  currentUserValue = null;
  login = () => of(true);
  logout = () => { return };
}

@Injectable({
  providedIn: 'root'
})
export class ClosetServiceMock {
  addClothing = (clothing) => of(clothing);
  getAllClothes = (user) => of(mockClosetList);
  removeClothing = (id) => of(mockClosetList);
  getClothingForEdit = () => mockClothingOne;
  setClothingForEdit = () => { return };
  editClothing = () => of(true);
  sortOptions = sortOptions;
  filterOptions = filterOptions;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {
  update = (user) => of(mockUserTwo);
  register = (params) => of({auth: true});
}

@Injectable({
  providedIn: 'root'
})
export class LogOutfitServiceMock {
  getAllOutfitClothes = (params) => of(mockOutfitClothingList);
  addOutfitClothing = (params) => of(true);
  deleteOutfitClothing = (params) => of(true);
}

@Injectable({
  providedIn: 'root'
})
export class RoutesServiceMock {
  getPrevUrl = () => '/log-outfit';
  setPrevUrl = (params) => { return };
}
