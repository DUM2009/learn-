/**
 * Gold Test - Fotossíntese
 * 20 perguntas: 10 fáceis, 5 intermédias, 5 difíceis
 * Aprovação: 17/20
 */

const goldTestData = {
    id: "photosynthesis-goldtest",
    title: "🌿 Teste Ouro — Fotossíntese",
    missionUrl: "mission-photosynthesis.html",
    passScore: 17,
    totalQuestions: 20,
    questions: [
        /* ── Fáceis (1–10) ── */
        {
            id: 1,
            difficulty: "easy",
            question: "Qual é o principal pigmento responsável pela captação de luz nas plantas?",
            options: [
                { text: "Clorofila", correct: true },
                { text: "Caroteno", correct: false },
                { text: "Melanina", correct: false },
                { text: "Xantofila", correct: false }
            ]
        },
        {
            id: 2,
            difficulty: "easy",
            question: "Onde se encontram os tilacoides no cloroplasto?",
            options: [
                { text: "No estroma", correct: false },
                { text: "Na membrana externa", correct: false },
                { text: "Dentro do cloroplasto, como membranas empilhadas (granas)", correct: true },
                { text: "No núcleo celular", correct: false }
            ]
        },
        {
            id: 3,
            difficulty: "easy",
            question: "Que gás é libertado durante a fase clara da fotossíntese?",
            options: [
                { text: "CO₂", correct: false },
                { text: "N₂", correct: false },
                { text: "O₂", correct: true },
                { text: "H₂", correct: false }
            ]
        },
        {
            id: 4,
            difficulty: "easy",
            question: "De onde vem o oxigénio libertado durante a fotossíntese?",
            options: [
                { text: "Do CO₂", correct: false },
                { text: "Da glicose", correct: false },
                { text: "Da fotólise da água", correct: true },
                { text: "Do ar atmosférico", correct: false }
            ]
        },
        {
            id: 5,
            difficulty: "easy",
            question: "Qual é o produto final rico em energia que o ciclo de Calvin constrói?",
            options: [
                { text: "ATP", correct: false },
                { text: "NADPH", correct: false },
                { text: "Glicose (e outros açúcares)", correct: true },
                { text: "ADP", correct: false }
            ]
        },
        {
            id: 6,
            difficulty: "easy",
            question: "Em que parte do cloroplasto ocorre o ciclo de Calvin?",
            options: [
                { text: "Nos tilacoides", correct: false },
                { text: "No estroma", correct: true },
                { text: "Na membrana externa", correct: false },
                { text: "No núcleo", correct: false }
            ]
        },
        {
            id: 7,
            difficulty: "easy",
            question: "Que moléculas a fase clara fornece ao ciclo de Calvin?",
            options: [
                { text: "CO₂ e H₂O", correct: false },
                { text: "Glicose e O₂", correct: false },
                { text: "ATP e NADPH", correct: true },
                { text: "ADP e NADP⁺", correct: false }
            ]
        },
        {
            id: 8,
            difficulty: "easy",
            question: "Qual é a molécula que recebe o CO₂ no início do ciclo de Calvin?",
            options: [
                { text: "ATP", correct: false },
                { text: "G3P", correct: false },
                { text: "NADPH", correct: false },
                { text: "RuBP", correct: true }
            ]
        },
        {
            id: 9,
            difficulty: "easy",
            question: "Quantas voltas do ciclo de Calvin são necessárias para produzir uma molécula de glicose?",
            options: [
                { text: "2", correct: false },
                { text: "3", correct: false },
                { text: "6", correct: true },
                { text: "12", correct: false }
            ]
        },
        {
            id: 10,
            difficulty: "easy",
            question: "A fotossíntese transforma energia luminosa em que tipo de energia?",
            options: [
                { text: "Energia térmica", correct: false },
                { text: "Energia elétrica", correct: false },
                { text: "Energia química (ligações dos açúcares)", correct: true },
                { text: "Energia cinética", correct: false }
            ]
        },

        /* ── Intermédias (11–15) ── */
        {
            id: 11,
            difficulty: "medium",
            question: "Qual é a função da ATP sintase na fase clara?",
            options: [
                { text: "Absorver fotões de luz", correct: false },
                { text: "Usar o gradiente de H⁺ para produzir ATP", correct: true },
                { text: "Fixar CO₂ à RuBP", correct: false },
                { text: "Produzir NADPH diretamente da água", correct: false }
            ]
        },
        {
            id: 12,
            difficulty: "medium",
            question: "O que é a fotólise e qual a sua importância para a cadeia transportadora de eletrões?",
            options: [
                { text: "Síntese de glicose; fornece energia ao Calvin", correct: false },
                { text: "Divisão da água pela luz; fornece eletrões à cadeia transportadora", correct: true },
                { text: "Produção de CO₂; alimenta o estroma", correct: false },
                { text: "Redução do NADP⁺; regenera RuBP", correct: false }
            ]
        },
        {
            id: 13,
            difficulty: "medium",
            question: "Se a concentração de CO₂ cair para zero (estomas fechados), o que acontece ao ciclo de Calvin?",
            options: [
                { text: "Continua normalmente usando O₂ como substituto", correct: false },
                { text: "Para por falta de substrato para a fixação", correct: true },
                { text: "Acelera porque há mais ATP disponível", correct: false },
                { text: "Começa a produzir proteínas em vez de açúcares", correct: false }
            ]
        },
        {
            id: 14,
            difficulty: "medium",
            question: "Quais são as moléculas que o ciclo de Calvin devolve à fase clara?",
            options: [
                { text: "CO₂ e H₂O", correct: false },
                { text: "G3P e RuBP", correct: false },
                { text: "ADP e NADP⁺", correct: true },
                { text: "Glicose e O₂", correct: false }
            ]
        },
        {
            id: 15,
            difficulty: "medium",
            question: "Porque é que a fase escura (ciclo de Calvin) é chamada 'independente da luz'?",
            options: [
                { text: "Só ocorre à noite", correct: false },
                { text: "Não usa diretamente fotões de luz, embora dependa dos produtos da fase clara", correct: true },
                { text: "Não precisa de ATP para funcionar", correct: false },
                { text: "Produz luz como subproduto", correct: false }
            ]
        },

        /* ── Difíceis (16–20) ── */
        {
            id: 16,
            difficulty: "hard",
            question: "Se um inibidor bloquear especificamente a rubisco, qual é o efeito em cascata mais imediato?",
            options: [
                { text: "A fotólise da água para imediatamente", correct: false },
                { text: "O CO₂ acumula-se e a RuBP não é consumida; Calvin para", correct: true },
                { text: "A ATP sintase deixa de funcionar", correct: false },
                { text: "O NADPH oxida-se espontaneamente", correct: false }
            ]
        },
        {
            id: 17,
            difficulty: "hard",
            question: "Uma planta é exposta a luz com apenas comprimentos de onda verdes. O que se espera?",
            options: [
                { text: "Fotossíntese normal, pois toda a luz serve", correct: false },
                { text: "Fotossíntese reduzida, pois a clorofila reflete maioritariamente o verde e absorve mal", correct: true },
                { text: "Fotossíntese aumentada, pois o verde é o melhor comprimento de onda", correct: false },
                { text: "Nenhuma alteração; a fase clara não depende da cor", correct: false }
            ]
        },
        {
            id: 18,
            difficulty: "hard",
            question: "No escuro total e prolongado, qual das seguintes moléculas esgota primeiro nas folhas?",
            options: [
                { text: "CO₂ atmosférico", correct: false },
                { text: "Reservas de ATP e NADPH geradas pela fase clara", correct: true },
                { text: "A RuBP, que não pode ser regenerada sem açúcar", correct: false },
                { text: "O oxigénio dissolvido na célula", correct: false }
            ]
        },
        {
            id: 19,
            difficulty: "hard",
            question: "Qual das seguintes afirmações descreve melhor a interdependência entre fase clara e ciclo de Calvin?",
            options: [
                { text: "São paralelas e funcionam de forma autónoma", correct: false },
                { text: "A fase clara produz ATP/NADPH que Calvin consome; Calvin devolve ADP/NADP⁺ que a fase clara recarrega", correct: true },
                { text: "Calvin produz ATP que a fase clara consome para captar luz", correct: false },
                { text: "Só há dependência quando há pouca luz", correct: false }
            ]
        },
        {
            id: 20,
            difficulty: "hard",
            question: "Uma mutação elimina o gradiente de H⁺ nos tilacoides. Qual cadeia de efeitos seria mais precisa?",
            options: [
                { text: "Menos ATP → menos G3P → menos glicose → Calvin para", correct: true },
                { text: "Menos NADPH → menos fotólise → menos O₂ libertado", correct: false },
                { text: "Mais RuBP → mais fixação de CO₂ → mais glicose", correct: false },
                { text: "Menos clorofila → menos absorção de luz → menos fotólise", correct: false }
            ]
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = goldTestData;
}
