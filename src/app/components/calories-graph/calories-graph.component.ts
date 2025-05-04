import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

// ==============================================


@Component({
  selector: 'app-calories-graph',
  templateUrl: './calories-graph.component.html',
  styleUrls: ['./calories-graph.component.scss']
})
export class CaloriesGraphComponent  implements AfterViewInit {
  @ViewChild('calorieCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  protected data: number[] = [1800, 2000, 1500, 2200, 1900, 1700, 2100];
  protected labels: string[] = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  public ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx){
      return;
    }

    const chartHeight: number = 120;
    const barWidth: number = 37;
    const spacing: number = 20;
    const maxCalories: number = Math.max(...this.data);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.data.forEach((value: number, i: number) => {
      const barHeight: number = (value / maxCalories) * chartHeight;
      const x: number = i * (barWidth + spacing) + spacing;
      const y: number = canvas.height - barHeight - 20;

      this.drawRoundedRect(ctx, x, y, barWidth, barHeight, 6, '#13d586');

      ctx.fillStyle = '#fff';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y + 14);

      ctx.fillStyle = '#fff';
      ctx.font = '11px Arial';
      ctx.fillText(this.labels[i], x + barWidth / 2, canvas.height - 5);
    });
  }

  private drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, color: string): void {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

}
