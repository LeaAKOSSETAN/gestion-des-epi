package com.example.gestion_des_epi.gestion_epi.securite;

@Configuration
@EnableWebSecurity
public class ConfigurationSecuriteApplication {
    @Bean
    public SecurityFilterChain SecurityFilterChain(HttpSecurity httpSecurity){
        return
        httpSecurity
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(
                authorize ->
                    authorize.requestMatchers('/inscription').permitAll()
                        .anyRequest().authenticated();
            ).build();
    }

}
