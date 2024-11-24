package com.basico.prova.service;

import com.basico.prova.entities.Pedido;
import com.basico.prova.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

        @Autowired
        private PedidoRepository pedidoRepository;


        public List<Pedido> listarTodos() {
            return pedidoRepository.findAll();
        }

        public Optional<Pedido> encontrarPorId(Long id) {
            return pedidoRepository.findById(id);
        }

        public Pedido salvar(Pedido pedido) {
            Pedido pedidoSalvo = pedidoRepository.save(pedido);


            return pedidoSalvo;
        }

        public Pedido atualizar(Long id, Pedido pedido) {
            Pedido novoPedido = pedidoRepository.getOne(id);
            novoPedido.setDataPedido(pedido.getDataPedido());
            return pedidoRepository.save(novoPedido);}

        public void deletar(Long id) {
            pedidoRepository.deleteById(id);
        }
    }

