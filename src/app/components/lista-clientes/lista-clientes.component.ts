import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (e) => console.error(e)
    });
  }

  deleteCliente(id: number | undefined): void {

    if (id === undefined) {
      console.error('ID is undefined');
      return;
    }
    
    this.clienteService.deleteCliente(id).subscribe({
      next: () => {
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
      },
      error: (e) => console.error(e)
    });
  }

  editCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes/edit', cliente.id]);
  }

  nuevoCliente(): void {
    this.router.navigate(['/clientes/add']);
  }
}
