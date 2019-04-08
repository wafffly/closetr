import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { ClosetService } from '../../../services/closet.service';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { DateFormatService } from '../../../services/utils/date-format.service';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss'],
})

export class LogOutfitComponent implements OnInit {
  outfitClothingList: any;
  closetList: any;
  editMode : boolean;
  searchText: String;
  currentUserSubscription: Subscription;
  currentUser: User;
  params: any;

  constructor(private router: Router,
              private logOutfitService: LogOutfitService,
              private closetService: ClosetService,
              private authenticationService: AuthenticationService,
              private routesService: RoutesService,
              private dateFormatService: DateFormatService) {
    this.editMode = false;
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    )
    if (this.currentUser) {
      this.params = {
        userID: this.currentUser.id,
        date: this.dateFormatService.formatDateString(new Date())
      };
    }
    this.getAllOutfitClothes(this.params);
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
  }

  navTo(): void {
    this.routesService.setPrevUrl('/log-outfit');
    this.router.navigate(['/add-clothing']);
  }

  search(): void {
  }

  /*
  Checks if the given clothing's ID is contained in the current outfit
  clothing list. Returns true if it is present.
  */
  outfitClothingListContains(clothing: any): boolean {
    var clothingID = clothing.clothingID;
    var contains = false;
    for (let i in this.outfitClothingList) {
      if (this.outfitClothingList[i].clothingID === clothingID) {
        contains = true;
        break;
      }
    }
    return contains;
  }

  /*
  Adds clothing selected from search results to the outfit clothing list.
  */
  addSearchResult(clothing: any): void {
    // check if clothing to be added is already in outfit clothing list
    if (!this.outfitClothingListContains(clothing)) {
      const params = {
        clothingID: clothing.clothingID,
        userID: this.currentUser.id,
        date: this.dateFormatService.formatDateString(new Date())
      };
      this.addOutfitClothing(params);
      this.getAllOutfitClothes(this.params);
    }
  }

  removeCard(outfitEntry: any): void {
    this.deleteOutfitClothing(outfitEntry.outfitEntryID);
  }

  getAllClothes = (): Observable<any> => this.closetService.getAllClothes(this.currentUser)
    .subscribe(data => this.closetList = data);

  deleteOutfitClothing(outfitEntryID: any): void {
    this.logOutfitService.deleteOutfitClothing(outfitEntryID).subscribe(
      (data: any) => {
        this.getAllOutfitClothes(this.params);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addOutfitClothing(params: any): void {
    this.logOutfitService.addOutfitClothing(params).subscribe(
      (data: any) => {
        this.getAllOutfitClothes(this.params);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllOutfitClothes(params: any): void {
    this.logOutfitService.getAllOutfitClothes(params).subscribe(
      (data: any) => {
        this.outfitClothingList = data.data;
        for (let clothing of this.outfitClothingList) {
          clothing = new Clothing(clothing);
        };
      },
      err => {
      }
    );

  }

}
