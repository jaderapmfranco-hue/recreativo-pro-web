import { describe, expect, it } from "vitest";
import { createClient } from '@supabase/supabase-js';

describe("Supabase Configuration", () => {
  it("validates Supabase credentials and connection", async () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    // Verificar se as variáveis de ambiente estão definidas
    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();
    expect(supabaseUrl).toMatch(/^https:\/\/.+\.supabase\.co$/);
    expect(supabaseAnonKey).toMatch(/^(eyJ|sb_publishable_)/); // JWT ou formato sb_publishable_

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Testar conexão básica com Supabase
    const { data, error } = await supabase.auth.getSession();
    
    // Não deve haver erro na chamada (mesmo que não haja sessão ativa)
    expect(error).toBeNull();
    
    // A resposta deve ter a estrutura esperada
    expect(data).toBeDefined();
    expect(data).toHaveProperty('session');
  });
});
