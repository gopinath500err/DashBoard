import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../_services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading" class="d-flex flex-column justify-content-center align-items-center loaderView">
      <div class="spinnrBox">
        <mat-spinner color="primary" diameter="30" strokeWidth="3"></mat-spinner>
        <h6 class="mt-4 text-secondary">Loading...</h6>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .mat-progress-spinner circle, .mat-spinner circle {
      stroke: #234e8f !important;
    }
    .spinnrBox {
      background-color: #ffffff;
      padding: 8px 16px 2px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: 1px 3px 11px #bababa7a;
      align-items: center;
      border-radius: 6px;
      border: 1px solid #c0c0c045;
    }
    .loaderView {
      position: absolute;
      height: 100%;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 10000;
      transition: all 1s ease-in;
    }
  `],

})
export class LoaderComponent implements OnInit {
  loading: boolean;
  constructor(private loader: LoaderService) {
    this.loader.isLoading.subscribe((status: any) => {
      this.loading = status;
    });
  }

  ngOnInit(): void {
  }

}
