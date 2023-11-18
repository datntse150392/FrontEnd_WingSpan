import { Component, OnInit } from '@angular/core';
import { BillBoard } from '../models/BillboardModel';
import { HomepageService } from './homepage.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {}
}
