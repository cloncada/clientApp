import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agregar-editar-cliente',
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrls: ['./agregar-editar-cliente.component.css']
})
export class AgregarEditarClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  isEditMode: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.clienteService.getClienteById(params['id']).subscribe({
          next: (data) => this.cliente = data,
          error: (e) => console.error(e)
        });
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.clienteService.updateCliente(this.cliente.id!, this.cliente).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: (e) => console.error(e)
      });
    } else {
      this.clienteService.createCliente(this.cliente).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: (e) => console.error(e)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
