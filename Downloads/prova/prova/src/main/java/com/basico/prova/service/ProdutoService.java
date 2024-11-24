package com.basico.prova.service;


import com.basico.prova.entities.Pedido;
import com.basico.prova.entities.Produto;
import com.basico.prova.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> encontrarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto alterar(Long id, Produto produto) {
        Produto novoProduto = produtoRepository.getOne(id);
        novoProduto.setNome(produto.getNome());
        novoProduto.setPreco(produto.getPreco());
        return produtoRepository.save(novoProduto);}

    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }
}

