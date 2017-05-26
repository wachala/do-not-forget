package pl.pw.as.model.generator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GeneratorData {
    private int timeAvailable;
    private GeneratorStrategy strategy;
}
