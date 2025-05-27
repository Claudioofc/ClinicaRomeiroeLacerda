# 🌍 Guia de Rastreamento Geográfico Avançado

## 📊 Sistema de Localização Implementado

O site agora possui um **sistema de rastreamento geográfico em múltiplas camadas** que coleta dados detalhados sobre a localização dos visitantes.

### 🎯 **Dados Coletados**

#### **1. Localização Precisa (GPS)**
- **Coordenadas exatas** (latitude/longitude)
- **Cidade, Estado, País**
- **CEP/Código Postal**
- **Precisão da localização** (em metros)

#### **2. Localização por IP (Fallback)**
- **Cidade, Estado, País** baseado no IP
- **Provedor de Internet (ISP)**
- **Endereço IP** (anonimizado)
- **Tipo de conexão**

#### **3. Dados do Navegador**
- **Idioma preferido**
- **Fuso horário**
- **Plataforma/Sistema operacional**
- **Resolução de tela**
- **Tipo de dispositivo**

#### **4. Origem do Tráfego**
- **Site de origem** (referrer)
- **Parâmetros UTM** (campanhas)
- **Tipo de acesso** (direto, busca, social, etc.)

---

## 🔍 **Como Testar o Rastreamento**

### **1. Teste Básico**
1. Acesse: `http://localhost:8000`
2. Abra o Console (F12)
3. Procure por mensagens:
   - `🌍 Iniciando rastreamento de localização...`
   - `📍 Coordenadas obtidas: [lat], [lng]`
   - `🏙️ Localização detalhada: [dados]`

### **2. Página de Teste Avançada**
1. Acesse: `http://localhost:8000/analytics-test.html`
2. Veja seções:
   - **📊 Status do Google Analytics**
   - **🌍 Dados Geográficos Detectados**
   - **📝 Eventos Rastreados**

### **3. Comandos de Debug**
```javascript
// Ver todos os eventos de localização
window.debugAnalytics.getEvents().filter(e => 
  e.category.includes('Location') || 
  e.category.includes('Geographic')
)

// Ver dados de sessão
window.debugAnalytics.getEvents().filter(e => 
  e.category.includes('Technical') || 
  e.category.includes('Traffic')
)
```

---

## 📈 **Eventos Enviados para Google Analytics**

### **Categorias de Eventos:**

#### **🌍 User Location**
- `precise_location` → "Cidade, Estado, País"
- `ip_location` → "Cidade, Estado, País (por IP)"
- `coordinates_only` → "Lat, Lng"

#### **🗺️ Geographic Data**
- `country` → Nome do país
- `state` → Nome do estado/região
- `city` → Nome da cidade
- `country_ip` → País por IP
- `state_ip` → Estado por IP
- `city_ip` → Cidade por IP

#### **🌐 Traffic Source**
- `utm_source` → Origem da campanha
- `utm_medium` → Meio da campanha
- `utm_campaign` → Nome da campanha
- `referrer_domain` → Domínio de origem
- `referrer` → URL completa de origem

#### **📱 Technical Info**
- `screen_resolution` → "1920x1080"
- `viewport_size` → "1366x768"
- `connection_type` → "4g", "wifi", etc.
- `color_depth` → "24"
- `pixel_ratio` → "1" ou "2"

#### **👤 User Info**
- `language` → "pt-BR"
- `timezone` → "America/Sao_Paulo"
- `platform` → "Win32"

#### **🌐 Network Info**
- `isp` → Nome do provedor

---

## 🎛️ **Configuração Avançada**

### **Personalizar Coleta de Dados**

Edite `app/services/analyticsService.js`:

```javascript
// Desabilitar geolocalização GPS
// Comente a linha: navigator.geolocation.getCurrentPosition

// Alterar precisão da localização
{
    enableHighAccuracy: false,  // Menos preciso, mais rápido
    timeout: 5000,             // Timeout menor
    maximumAge: 600000         // Cache por 10 minutos
}

// Adicionar mais APIs de IP
const ipApis = [
    'https://ipapi.co/json/',
    'https://ip-api.com/json/?lang=pt',
    'https://ipinfo.io/json',
    'https://ipwhois.app/json/'  // API adicional
];
```

### **Configurar Google Analytics Real**

1. **Obter ID do GA:**
   - Acesse [Google Analytics](https://analytics.google.com)
   - Crie propriedade GA4
   - Copie o ID (formato: `G-XXXXXXXXXX`)

2. **Configurar no código:**
   ```javascript
   const GA_MEASUREMENT_ID = 'G-SEU-ID-AQUI';
   ```

3. **Configurar Goals no GA:**
   - **Conversão:** WhatsApp clicks
   - **Engagement:** Tempo na página
   - **Geographic:** Visitantes por região

---

## 📊 **Relatórios no Google Analytics**

### **Dados Disponíveis:**

#### **1. Relatórios Geográficos**
- **Localização** → Relatórios → Demografia → Geografia
- **Mapa de calor** com visitantes por região
- **Cidades mais ativas**

#### **2. Eventos Customizados**
- **Eventos** → Todos os eventos
- Filtrar por:
  - `User Location`
  - `Geographic Data`
  - `Traffic Source`

#### **3. Parâmetros Customizados**
- **Configurar** → Definições personalizadas
- Criar dimensões para:
  - `custom_parameter_city`
  - `custom_parameter_state`
  - `custom_parameter_isp`

#### **4. Audiências Geográficas**
- **Audiências** → Criar audiência
- Critérios geográficos:
  - Por cidade/estado
  - Por tipo de conexão
  - Por dispositivo

---

## 🔒 **Privacidade e LGPD**

### **Dados Coletados:**
- ✅ **Localização aproximada** (cidade/estado)
- ✅ **Dados técnicos** (resolução, idioma)
- ✅ **Origem do tráfego** (referrer, UTM)
- ❌ **Não coletamos dados pessoais** identificáveis

### **Conformidade:**
- **Anonimização** de IPs ativada
- **Consentimento** pode ser implementado
- **Opt-out** disponível via `doNotTrack`

### **Implementar Banner de Cookies:**
```html
<!-- Adicionar ao index.html -->
<div id="cookie-banner" style="display:none;">
  <p>Este site usa cookies e coleta dados de localização para melhorar sua experiência.</p>
  <button onclick="acceptCookies()">Aceitar</button>
  <button onclick="rejectCookies()">Recusar</button>
</div>
```

---

## 🚀 **Próximos Passos**

### **1. Configuração Imediata:**
- [ ] Substituir `G-XXXXXXXXXX` por ID real do GA
- [ ] Testar em dispositivos móveis
- [ ] Verificar precisão da localização

### **2. Melhorias Futuras:**
- [ ] Implementar banner de cookies
- [ ] Adicionar relatórios automáticos
- [ ] Configurar alertas geográficos
- [ ] Integrar com CRM/WhatsApp Business

### **3. Análise de Dados:**
- [ ] Identificar regiões com mais visitantes
- [ ] Otimizar campanhas por localização
- [ ] Personalizar conteúdo por região
- [ ] Ajustar horários de atendimento

---

## 📞 **Casos de Uso Práticos**

### **Para Clínica Odontológica:**

1. **Identificar Região de Atuação:**
   - Mapear de onde vêm os pacientes
   - Focar marketing em regiões próximas
   - Identificar oportunidades de expansão

2. **Personalizar Atendimento:**
   - Horários baseados no fuso horário
   - Idioma preferido do visitante
   - Campanhas regionais específicas

3. **Otimizar Conversões:**
   - WhatsApp com DDD da região
   - Promoções por localização
   - Parcerias locais

4. **Análise de Concorrência:**
   - Visitantes de outras cidades
   - Efetividade de campanhas regionais
   - ROI por localização

---

**💡 Dica:** Mantenha o console aberto durante os testes para ver todos os dados sendo coletados em tempo real! 