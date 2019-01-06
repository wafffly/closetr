import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  /*
  Generic closet service containing methods that help in updating and maintaining
  closet items accross all componenets.
  */
  closetList: any;
  closetCount: number;
  clothingForEdit: any;

  constructor(private http: HttpClient) {
    var ret = this.http.get('http://localhost:8080/api/clothes/all').subscribe(
      (data: any) => {
        console.log(data);
      }, // success path
      error => {
        console.log(error);
      }
    );
    console.log(ret);
    this.closetCount = 0;
    this.closetList = {
      1: {clothingID: 1, clothingCost:'$45',clothingName:'Aritzia TShirt', clothingWorn: 45, clothingCategory:'TShirt'},
      2: {clothingID: 2, clothingCost: '$35', clothingName:'Zara Turtleneck TShirt', clothingWorn: 32, clothingCategory:'TShirt'},
      3: {clothingID: 3, clothingCost: '$99', clothingName:'Aritzia Sweater', clothingWorn: 23, clothingCategory:'Sweater'},
      4: {clothingID: 4, clothingCost:'$35',clothingName:'Uniqlo Palazzo Pants', clothingWorn: 17, clothingCategory:'Pants'},
      5: {clothingID: 5, clothingCost:'$5',clothingName:'Uniqlo Socks', clothingWorn: 16, clothingCategory:'Socks'},
      6: {clothingID: 6, clothingCost:'$35',clothingName:'Zara Cocoon Cardigan', clothingWorn: 15, clothingCategory:'Cardigan'}
    };
  }

  /*
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */

  generateClothingID(): number {
    this.closetCount++;
    return this.closetCount;
  }

  addClothing(clothing: any): void {
    var newClothingID = this.generateClothingID();
    var newClothing = {
      'clothingID': newClothingID,
      'clothingName':clothing.clothingName,
      'clothingCost':clothing.clothingCost,
      'clothingCategory':clothing.clothingCategory,
      'clothingWorn': 0
    }
    this.closetList[newClothingID] = newClothing;
    var params = {
      clothing: newClothing
    };
    var ret = this.http.post('http://localhost:8080/api/clothes/clothing', params).subscribe(
      (data: any) => {
        console.log(data);
      }, // success path
      error => {
        console.log(error);
      }
    );
  }

  removeClothing(clothingID: any): void {
    delete this.closetList[clothingID];
  }

  editClothing(editedClothing: any): void {
    this.closetList[editedClothing.clothingID] = editedClothing;
  }

  getAllClothes(): any {
    return this.closetList;
  }

  setAllClothes(closetList: any): void {
    this.closetList = closetList;
  }

  setClothingForEdit(clothing: any): void {
    this.clothingForEdit = clothing;
  }

  getClothingForEdit(): any {
    return this.clothingForEdit;
  }

}
