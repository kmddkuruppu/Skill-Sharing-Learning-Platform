package net.javaguides.sslp.controller;

import net.javaguides.sslp.dto.ChatRequest;
import net.javaguides.sslp.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    private final WebClient webClient;

    @Value("${openai.api.key}")
    private String apiKey;

    public ChatController() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    @PostMapping
    public Mono<String> chat(@RequestBody ChatRequest request) {
        return webClient.post()
                .bodyValue(Map.of(
                        "model", "gpt-3.5-turbo",
                        "messages", new Object[]{
                                Map.of("role", "user", "content", request.getMessage())
                        }
                ))
                .retrieve()
                .bodyToMono(ChatResponse.class)
                .map(response -> response.getChoices().get(0).getMessage().getContent());
    }
}
