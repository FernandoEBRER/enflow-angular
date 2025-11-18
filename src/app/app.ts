import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tabelas } from './tabelas/tabelas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Tabelas, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tailwind-angular');
}
