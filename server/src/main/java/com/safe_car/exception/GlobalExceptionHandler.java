package com.safe_car.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(value = IllegalStateException.class)
	public ResponseEntity<ErrorDetails> handleIllegalStateException(IllegalStateException ex) {
		ErrorDetails errorDetails = this.prepareErrorDetails(ex);
		return new ResponseEntity<>(errorDetails, HttpStatus.METHOD_NOT_ALLOWED);
	}

	@ExceptionHandler(value = NoSuchElementException.class)
	public ResponseEntity<ErrorDetails> handleNoSuchElementException(NoSuchElementException ex) {
		ErrorDetails errorDetails = this.prepareErrorDetails(ex);
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(value = NumberFormatException.class)
	public ResponseEntity<ErrorDetails> handleNumberFormatException(NumberFormatException ex) {
		ErrorDetails errorDetails = this.prepareErrorDetails(ex);
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(value = DataIntegrityViolationException.class)
	public ResponseEntity<ErrorDetails> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
		ErrorDetails errorDetails = this.prepareErrorDetails(ex);
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

	private ErrorDetails prepareErrorDetails(Exception exception) {
		ErrorDetails errorDetails = new ErrorDetails();
		errorDetails.setTimestamp(LocalDate.now());
		errorDetails.setMessage(exception.getMessage());
		return errorDetails;
	}

}
