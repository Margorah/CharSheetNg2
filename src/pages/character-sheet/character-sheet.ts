import { Component, ComponentFactoryResolver, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { style, state, animate, trigger, transition } from '@angular/animations';

import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import { Character } from '../../app/models/character-model';
import { STATCOMPONENTS } from '../../app/models/statComponents-model';

import { StatComponent } from '../../components/stat/stat';
import { StatFormChangeComponent } from '../../components/stat-form-change/stat-form-change';
import { StatSliderChangeComponent } from '../../components/stat-slider-change/stat-slider-change';
import { StatButtonChangeComponent } from '../../components/stat-button-change/stat-button-change';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';
import * as PrefActions from '../../app/store/actions/preferences-actions';

@IonicPage()
@Component({
  selector: 'page-character-sheet',
  templateUrl: 'character-sheet.html',
  animations: [
    trigger('charTitle', [
      state('in',
        style({
          transform: 'rotateX(0)'
      })),
      transition('void => *', [
        style({
          transform: 'rotateX(-145deg)'
        }),
        animate(150)
      ])
    ]),
    trigger('statTitle', [
      state('in',
        style({
          transform: 'rotateX(0)'
      })),
      transition('void => *', [
        style({
          transform: 'rotateX(-145deg)'
        }),
        animate(150)
      ])
    ])
    // trigger('activeRangeHeight', [
    //   state('in', style({
    //     height: '*',
    //     overflow: 'hidden'
    //   })),
    //   transition('void => *', [
    //     style({
    //       height: '0px',
    //       overflow: 'hidden'
    //     }),
    //     animate(250)
    //   ])
    // ])
  ]
})
export class CharacterSheetPage {
  @ViewChild('statsContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  // private statsComponents = [];
  private character: Observable<Character>;
  // private stats: Observable<CharacterStat[]>;
  private currId: string | null;
  private currRngVal  = 0;
  private reorderState = false;

  private currSub: Subscription;
  private statsSub: Subscription;
  private rngValSub: Subscription;

  private currentStat: Observable<CharacterStat>;

  constructor(private store: Store<fromRoot.State>, private compFactRes: ComponentFactoryResolver) { }

  ngOnInit() {
    this.character = this.store.select(fromRoot.getCharacter);
    this.currentStat = this.store.select(fromRoot.getStat);

    this.currSub = this.store.select(fromRoot.getStatId).subscribe((id) => {
      this.currId = id;
    });

    this.statsSub = this.store.select(fromRoot.getStats).subscribe((stats) => {
      this.buildComponentList(stats);
    });
  }

  // ngAfterViewInit() {
    // this.stats = this.store.select(fromRoot.getStats);

    // this.store.select(fromRoot.getStats), (action, stats) => {
    //   this.buildComponentList(stats);
    // };
  // }

  unselectStat() {
    this.store.dispatch(new StatActions.Unselect());
  }

  createStat() {
    this.store.dispatch(new NavActions.CreateStat());
  }

  editStat() {
    this.store.dispatch(new NavActions.CreateStat('EDITMODE'));
  }

  buildComponentList(statsList: CharacterStat[]) {
    if (this.rngValSub !== undefined) {
      this.currRngVal = 0;
      this.rngValSub.unsubscribe();
    }
    this.container.clear();
    statsList.forEach((stat, index) => {
      if (stat.id !== this.currId) {
        const componentFactory = this.compFactRes.resolveComponentFactory(StatComponent);
        const component = this.container.createComponent(componentFactory);
        (<StatComponent>component.instance).stat = stat;
        (<StatComponent>component.instance).index = index;
      } else {
        const componentFactory = this.compFactRes.resolveComponentFactory(STATCOMPONENTS[stat.component]);
        const component = this.container.createComponent(componentFactory);
        // Component Ref requires explicitly calling the component
        switch (stat.component) {
          case 'form': {
            (<StatFormChangeComponent>component.instance).stat = stat;
            break;
          };
          case 'slide': {
            (<StatSliderChangeComponent>component.instance).stat = stat;
            this.rngValSub = (<StatSliderChangeComponent>component.instance).rngValue.subscribe((compRngVal) => {
              this.currRngVal = compRngVal;
            });
            break;
          };
          case 'button': {
            (<StatButtonChangeComponent>component.instance).stat = stat;
            break;          
          };
        }
      }
    });
  }

  ngOnDestroy() {
    this.currSub.unsubscribe();
    this.statsSub.unsubscribe();
  }

  toggleReorder() {
    this.reorderState = !this.reorderState;
  }

  reorderItems(indexes) {
    this.reorderState = false;
    this.store.dispatch(new StatActions.Reorder({from: indexes.from, to: indexes.to}));
  }

  // To get Item Reorder to work I had to change node_module/ionic-angular/components/item/item-reorder-utils.js
  //  Line 25
  //    Original :  while (node && nested < 4) {
  //    Changed  :  while (node && nested < 5) {
  
}
