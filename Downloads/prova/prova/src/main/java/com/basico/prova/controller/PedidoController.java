package com.basico.prova.controller;

import com.basico.prova.entities.Pedido;
import com.basico.prova.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Pedido> encontrarPedido(@PathVariable Long id) {
        return pedidoService.encontrarPorId(id);
    }

    @PostMapping("/add")
    public Pedido adicionarPedido(@RequestBody Pedido pedido) {
        return pedidoService.salvar(pedido);
    }

    @PutMapping("/alterar/{id}")
    public Pedido alterarPedido(@PathVariable Long id,@RequestBody Pedido pedido) {
        return pedidoService.atualizar(id, pedido);
    }


    @DeleteMapping("/{id}")
    public void deletarPedido(@PathVariable Long id) {
        pedidoService.deletar(id);
    }
}