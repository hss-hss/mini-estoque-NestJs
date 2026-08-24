import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  // GET - listar todos
  listarTodos() {
    return this.prisma.produto.findMany();
  }

  // POST - criar produto
  async criar(dados: CreateProdutoDto) {
    const produtoExistente = await this.prisma.produto.findFirst({
      where: {nome: dados.nome}
  });

  if(produtoExistente)
    throw new ConflictException("Já existe um produto com este nome!!")

    return this.prisma.produto.create({
      data: dados,
    });
  }

  // GET - buscar produto pelo ID
  async buscarPorId(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id }
    });
    if (!produto)
      throw new NotFoundException(`produto com o ID ${id} não foi encontrada`)
    return produto;
}
 

// atualizar produto
async atualizar(id: number, dados: UpdateProdutoDto) {
  await this.buscarPorId(id);

  if (dados.nome) {
    const produtoExistente = await this.prisma.produto.findFirst({
      where: {
        nome: dados.nome,
      },
    });

    if (produtoExistente && produtoExistente.id !== id) {
      throw new ConflictException(
        'Já existe um produto com este nome',
      );
    }
  }

  return this.prisma.produto.update({
    where: {
      id: id,
    },
    data: dados,
  });
}

  // DELETE - remover produto
  async remover(id: number) {
   await this.buscarPorId(id);

  return this.prisma.produto.delete({
      where: {id},
    });
  }
}