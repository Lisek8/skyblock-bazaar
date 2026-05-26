import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HypixelApiHttpService } from '../../../shared/service/hypixel-api/hypixel-api.http-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DecimalPipe } from '@angular/common';

enum FeastItem {
  Cornucopia = 'CORNUCOPIA',
  CarrotZest = 'CARROT_ZEST',
  Deepfries = 'DEEPFRIES',
  Aggourdian = 'AGGOURDIAN',
  CaneKnot = 'CANE_KNOT',
  MelonJuice = 'MELON_JUICE',
  CactusFlower = 'CACTUS_FLOWER',
  DesignerCoffeeBeans = 'DESIGNER_COFFEE_BEANS',
  Feastfungus = 'FEASTFUNGUS',
  Botroot = 'BOTROOT',
  SaltedSunflowerSeeds = 'SALTED_SUNFLOWER_SEEDS',
  CrystalizedMoonlight = 'CRYSTALIZED_MOONLIGHT',
  FloralGelatin = 'FLORAL_GELATIN'
}

const FEAST_ITEM_KEY_LIST = [
  FeastItem.Cornucopia,
  FeastItem.CarrotZest,
  FeastItem.Deepfries,
  FeastItem.Aggourdian,
  FeastItem.CaneKnot,
  FeastItem.MelonJuice,
  FeastItem.CactusFlower,
  FeastItem.DesignerCoffeeBeans,
  FeastItem.Feastfungus,
  FeastItem.Botroot,
  FeastItem.SaltedSunflowerSeeds,
  FeastItem.CrystalizedMoonlight,
  FeastItem.FloralGelatin
];

interface FeastDisplayItem {
  label: string;
  iconHref: string;
  buyPrice: number;
  sellPrice: number;
}

@Component({
  selector: 'app-feast',
  imports: [DecimalPipe],
  templateUrl: './feast.html',
  styleUrl: './feast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Feast implements OnInit {
  private readonly hypixelApiHttpService = inject(HypixelApiHttpService);
  private readonly destroyRef = inject(DestroyRef);

  readonly numberFormat = '1.2-2';

  readonly feastItemList = signal<FeastDisplayItem[]>([]);

  ngOnInit(): void {
    this.hypixelApiHttpService.getBazaarInfo().pipe(
      map((bazaarData): FeastDisplayItem[] => {
        return FEAST_ITEM_KEY_LIST.map((feastItemId) => {
          const feastItemData = bazaarData.products[feastItemId];

          return {
            label: feastItemId.toLowerCase().replaceAll('_', ' '),
            iconHref: `./icons/feast/${feastItemId.toLowerCase()}.png`,
            buyPrice: feastItemData.quick_status.buyPrice,
            sellPrice: feastItemData.quick_status.sellPrice,
          }
        });
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((itemList) => {
      this.feastItemList.set(itemList);
    })
  }
}
