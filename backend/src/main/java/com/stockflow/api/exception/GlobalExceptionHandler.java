package com.stockflow.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404 - produto não existe
    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<Map<String, Object>> naoEncontrado(RecursoNaoEncontradoException ex) {
        return resposta(HttpStatus.NOT_FOUND, ex.getMessage(), null);
    }

    // 400 - regra de negócio (ex.: saída maior que o saldo)
    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<Map<String, Object>> regraNegocio(RegraNegocioException ex) {
        return resposta(HttpStatus.BAD_REQUEST, ex.getMessage(), null);
    }

    // 400 - campos inválidos (@NotBlank, @Min...)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> validacao(MethodArgumentNotValidException ex) {
        Map<String, String> campos = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(erro -> campos.put(erro.getField(), erro.getDefaultMessage()));
        return resposta(HttpStatus.BAD_REQUEST, "Dados inválidos", campos);
    }

    // 400 - JSON mal formado ou tipo diferente de ENTRADA/SAIDA
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> jsonInvalido(HttpMessageNotReadableException ex) {
        return resposta(HttpStatus.BAD_REQUEST, "Corpo da requisição inválido", null);
    }

    private ResponseEntity<Map<String, Object>> resposta(HttpStatus status, String mensagem, Object campos) {
        Map<String, Object> corpo = new HashMap<>();
        corpo.put("status", status.value());
        corpo.put("mensagem", mensagem);
        if (campos != null) {
            corpo.put("campos", campos);
        }
        return ResponseEntity.status(status).body(corpo);
    }
}
