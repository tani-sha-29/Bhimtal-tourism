package com.bhimtal.portal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@SpringBootApplication
@EnableAsync
public class BhimtalPortalApplication {

    private static final Logger log = LoggerFactory.getLogger(BhimtalPortalApplication.class);

    public static void main(String[] args) {
        loadDotenv();
        SpringApplication.run(BhimtalPortalApplication.class, args);
    }

    /**
     * Automatically loads environment variables from a .env file if present.
     * Searches in current working directory, bhimtal-backend/, and parent directory.
     */
    private static void loadDotenv() {
        List<File> candidateFiles = List.of(
                new File(".env"),
                new File("bhimtal-backend/.env"),
                new File("../.env")
        );

        for (File envFile : candidateFiles) {
            if (envFile.exists() && envFile.isFile()) {
                log.info("Loading environment configuration from: {}", envFile.getAbsolutePath());
                try (BufferedReader reader = new BufferedReader(new FileReader(envFile, StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) {
                            continue;
                        }
                        int eqIndex = line.indexOf('=');
                        if (eqIndex > 0) {
                            String key = line.substring(0, eqIndex).trim();
                            String value = line.substring(eqIndex + 1).trim();

                            // Strip surrounding single or double quotes if present
                            if ((value.startsWith("\"") && value.endsWith("\"")) ||
                                (value.startsWith("'") && value.endsWith("'"))) {
                                if (value.length() >= 2) {
                                    value = value.substring(1, value.length() - 1);
                                }
                            }

                            // Only set if not already present in System properties or OS environment
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                } catch (IOException e) {
                    log.warn("Failed to read .env file at {}: {}", envFile.getAbsolutePath(), e.getMessage());
                }
                break; // Stop after loading the first matching .env file
            }
        }
    }
}
