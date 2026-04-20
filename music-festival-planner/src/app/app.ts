import { Component, computed, signal } from '@angular/core';

type FestivalDay = 'Friday' | 'Saturday' | 'Sunday';

interface SetItem {
  id: number;
  artist: string;
  stage: string;
  day: FestivalDay;
  time: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private nextId = 4;

  protected readonly title = 'Summer Sound Fest Planner';
  protected readonly days: FestivalDay[] = ['Friday', 'Saturday', 'Sunday'];
  protected readonly stages = ['Main Stage', 'River Stage', 'Acoustic Tent'];

  protected readonly lineup = signal<SetItem[]>([
    { id: 1, artist: 'The Midnight Echo', stage: 'Main Stage', day: 'Friday', time: '18:00' },
    { id: 2, artist: 'Neon Pines', stage: 'River Stage', day: 'Saturday', time: '16:30' },
    { id: 3, artist: 'Solar Drift', stage: 'Acoustic Tent', day: 'Sunday', time: '14:00' }
  ]);

  protected readonly selectedDay = signal<FestivalDay | 'All'>('All');

  protected readonly filteredLineup = computed(() => {
    const day = this.selectedDay();
    const items = this.lineup();

    if (day === 'All') {
      return items;
    }

    return items.filter((item) => item.day === day);
  });

  protected setDayFilter(day: FestivalDay | 'All'): void {
    this.selectedDay.set(day);
  }

  protected addSet(
    artistInput: HTMLInputElement,
    stageInput: HTMLSelectElement,
    dayInput: HTMLSelectElement,
    timeInput: HTMLInputElement
  ): void {
    const artist = artistInput.value.trim();
    const stage = stageInput.value;
    const day = dayInput.value as FestivalDay;
    const time = timeInput.value;

    if (!artist || !stage || !day || !time) {
      return;
    }

    this.lineup.update((items) => [
      ...items,
      {
        id: this.nextId++,
        artist,
        stage,
        day,
        time
      }
    ]);

    artistInput.value = '';
    timeInput.value = '';
    artistInput.focus();
  }

  protected removeSet(id: number): void {
    this.lineup.update((items) => items.filter((item) => item.id !== id));
  }
}
