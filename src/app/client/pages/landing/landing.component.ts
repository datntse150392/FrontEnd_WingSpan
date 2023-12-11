import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/core/services';
@Component({
  selector: 'app-content',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(public shareService: ShareService) {}
  ngOnInit() {}
}
