# 📊 Guia de Teste do Google Analytics

## 🔍 Como Verificar se o Analytics Está Funcionando

### 1. **Teste Rápido no Console do Navegador**

Abra o console do navegador (F12) e execute:

```javascript
// Verificar status completo
window.debugAnalytics.getStatus()

// Ver eventos rastreados
window.debugAnalytics.getEvents()

// Testar um evento
window.debugAnalytics.trackTest()
```

### 2. **Página de Teste Dedicada**

Acesse: `http://localhost:8000/analytics-test.html`

Esta página mostra:
- ✅ Status do Google Analytics
- 📊 Eventos rastreados localmente
- 🧪 Botões para testar eventos
- ℹ️ Informações do sistema

### 3. **Verificação Manual no Site Principal**

1. **Abra o site**: `http://localhost:8000`
2. **Abra o Console** (F12 → Console)
3. **Procure por mensagens**:
   - `🚀 Analytics initialized`
   - `📈 Google Analytics configurado com ID: G-XXXXXXXXXX`
   - `✅ Event tracked: [categoria] - [ação] - [label]`

### 4. **Testar Eventos Específicos**

#### WhatsApp Clicks:
- Clique em qualquer botão do WhatsApp
- Verifique no console: `✅ Event tracked: WhatsApp - click - [origem]`

#### Navegação:
- Clique nos links do menu
- Verifique eventos de navegação

#### Abas de Tratamentos:
- Clique nas abas "Implantes de Protocolo" e "Procedimentos"

## 🔧 Problemas Comuns e Soluções

### ❌ **Google Analytics não carregado**

**Sintomas:**
- Console mostra: `❌ Google Analytics não disponível`
- Status: `loaded: false`

**Soluções:**
1. **ID Inválido**: Substitua `G-XXXXXXXXXX` por um ID válido
2. **Bloqueador de Anúncios**: Desative temporariamente
3. **Erro de Rede**: Verifique conexão com internet
4. **CORS/HTTPS**: Teste em servidor HTTPS se necessário

### ⚠️ **Eventos só salvos localmente**

**Sintomas:**
- Console mostra: `⚠️ Google Analytics não disponível - evento salvo apenas localmente`
- Eventos aparecem em `localStorage` mas não no GA

**Soluções:**
1. Aguarde alguns segundos para o GA carregar
2. Verifique se o ID do GA está correto
3. Teste em modo incógnito

### 🔄 **DataLayer presente mas GTAG não funciona**

**Sintomas:**
- `window.dataLayer` existe
- `window.gtag` é undefined

**Soluções:**
1. Recarregue a página
2. Verifique se não há conflitos com outros scripts
3. Teste em navegador diferente

## 📈 Configuração do Google Analytics Real

### 1. **Obter ID do Google Analytics**

1. Acesse [Google Analytics](https://analytics.google.com)
2. Crie uma propriedade para o site
3. Copie o ID (formato: `G-XXXXXXXXXX`)

### 2. **Configurar no Código**

Edite `app/services/analyticsService.js`:

```javascript
const GA_MEASUREMENT_ID = 'G-SEU-ID-AQUI'; // Substitua pelo ID real
```

### 3. **Verificar no Google Analytics**

1. Acesse o painel do Google Analytics
2. Vá em **Relatórios** → **Tempo real**
3. Teste eventos no site
4. Verifique se aparecem em tempo real

## 🧪 Comandos de Debug Disponíveis

### No Console do Navegador:

```javascript
// Status completo do analytics
window.debugAnalytics.getStatus()

// Listar todos os eventos rastreados
window.debugAnalytics.getEvents()

// Limpar eventos locais
window.debugAnalytics.clearEvents()

// Testar evento personalizado
window.debugAnalytics.trackTest()

// Verificar se Google Analytics está carregado
console.log('GA Loaded:', !!(window.gtag && window.dataLayer))

// Ver DataLayer
console.log('DataLayer:', window.dataLayer)

// Contar eventos no localStorage
console.log('Local Events:', JSON.parse(localStorage.getItem('clinica_events') || '[]').length)
```

## 📊 Eventos Rastreados Automaticamente

### **Inicialização:**
- `Traffic Source` → `referrer` → [URL de origem]
- `Traffic Source` → `utm` → [Parâmetros UTM]
- `User Location` → `location` → [Cidade, País]

### **Interações do Usuário:**
- `WhatsApp` → `click` → [Origem do clique]
- `Navigation` → `scroll` → [Seção visualizada]
- `Tab` → `change` → [Aba selecionada]

### **Eventos Personalizados:**
- `Debug` → `test_event` → [Teste manual]

## 🔍 Verificação Final

### ✅ **Checklist de Funcionamento:**

- [ ] Console mostra `🚀 Analytics initialized`
- [ ] Console mostra `📈 Google Analytics configurado`
- [ ] `window.debugAnalytics` está disponível
- [ ] Eventos aparecem em `localStorage`
- [ ] Google Analytics carrega sem erros
- [ ] Eventos são enviados para GA (se ID válido)
- [ ] Página de teste funciona corretamente

### 📱 **Teste em Dispositivos:**

- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (Chrome Mobile, Safari Mobile)
- [ ] Modo incógnito
- [ ] Com/sem bloqueador de anúncios

## 🚀 Próximos Passos

1. **Configurar ID real** do Google Analytics
2. **Testar em produção** com domínio real
3. **Configurar Goals** no painel do GA
4. **Adicionar eventos personalizados** conforme necessário
5. **Configurar relatórios** personalizados

---

**💡 Dica:** Mantenha sempre o console aberto durante os testes para ver as mensagens de debug em tempo real! 