import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Grocery } from '../../shared/grocery/grocery';
import { GroceryListService } from '../../shared/grocery/grocery-list.service';
import * as SocialShare from 'nativescript-social-share';

@Component({
    selector: 'list',
    templateUrl: 'pages/list/list.html',
    styleUrls: ['pages/list/list-common.css', 'pages/list/list.css'],
    providers: [ GroceryListService ]
})
export class ListComponent implements OnInit {

    isLoading = false;
    listLoaded = false;
    grocery: string = "";
    groceryList: Array<Grocery> = [];
    groceryListService: GroceryListService;
    @ViewChild('groceryTextField') groceryTextField: ElementRef;

    constructor(groceryListService: GroceryListService) {

        this.groceryListService = groceryListService;
    }

    ngOnInit() {
        this.isLoading = true;
        this.groceryListService
            .load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach(groceryObject => {
                    this.groceryList.unshift(groceryObject);
                });

                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    add() {

        if ( this.grocery.trim() == "" ) {
            alert('Enter a grocery item.');
            return;
        }
        
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService
            .add(this.grocery)
            .subscribe(
                groceryObject => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = "";
                },
                () => {
                    alert({
                        message: 'An error occurred while adding an item to your list.',
                        okButtonText: 'Ok'
                    });
                    this.grocery = "";
                }
            );
    }

    share() {

        let listString = this.groceryList
            .map(grocery => grocery.name)
            .join(', ')
            .trim();
        SocialShare.shareText(listString);
    }
}