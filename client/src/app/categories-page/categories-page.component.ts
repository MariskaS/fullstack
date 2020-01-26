import { Component, OnInit } from '@angular/core';
import {Category} from "../shared/interfaces";
import {CategoriesService} from "../shared/services/categories.sevice";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  // $: this variable rxjs stream type async.
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }

}
