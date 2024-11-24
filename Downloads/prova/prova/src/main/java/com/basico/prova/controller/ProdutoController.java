package com.basico.prova.controller;

import com.basico.prova.entities.Pedido;
import com.basico.prova.entities.Produto;
import com.basico.prova.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Produto> encontrarProduto(@PathVariable Long id) {
        return produtoService.encontrarPorId(id);
    }

    @PostMapping("/add")
    public Produto adicionarProduto(@RequestBody Produto produto) {
        return produtoService.salvar(produto);
    }

    @PutMapping("/alterar/{id}")
    public Produto alterarPedido(@PathVariable Long id, @RequestBody Produto produto) {
        return produtoService.alterar(id, produto);
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        produtoService.deletar(id);
    }
}