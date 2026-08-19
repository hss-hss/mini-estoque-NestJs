import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  listarTodos() {
    return this.produtoService.listarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.buscarPorID(+id);
  }
  
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.criar(createProdutoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.atualizar(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.deletar(+id);
  }
}
