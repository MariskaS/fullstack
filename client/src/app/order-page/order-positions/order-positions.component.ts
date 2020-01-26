import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../shared/services/positions.sevice";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Position} from "../../shared/interfaces";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(private route: ActivatedRoute,
              private order: OrderService,
              private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map((positions: Position[]) => {
          return positions.map(position => {
            position.quantity = 1;
            return position
          })
        })
      )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Added x ${position.quantity}`);
    this.order.add(position);
  }
}
