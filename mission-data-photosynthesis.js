/**
 * Mission Data - Fotossíntese
 * Formato moderno: quiz como array por secção
 */

const missionData = {
    id: "photosynthesis",
    title: "🌿 Fotossíntese",
    description: "Descobre como a luz vira energia e como o CO₂ se transforma em açúcar.",
    totalXP: 190,
    badge: { icon: "🌿", name: "Mestre da Fotossíntese" },
    goldTestUrl: "mission-photosynthesis-goldtest.html",
    sections: [
        {
            id: "luz-vira-energia",
            title: "Luz vira energia (fase clara)",
            icon: "⚡",
            xpReward: 60,
            content: `
                <div class="section-content">
                    <h2>⚡ Luz vira energia (fase clara)</h2>
                    <p>A luz do sol não entra na planta e sai já transformada em açúcar. Antes disso, passa por uma central elétrica dentro da folha.</p>

                    <div class="info-card">
                        <h3>Onde acontece</h3>
                        <p>A fase clara ocorre nos <strong>tilacoides</strong>, membranas dentro do cloroplasto onde está a clorofila.</p>
                    </div>

                    <div class="info-card">
                        <h3>Fotólise da água</h3>
                        <p>A luz divide a água e liberta eletrões, H⁺ e oxigénio (O₂), que sai para o ar.</p>
                    </div>

                    <div class="info-card">
                        <h3>Cadeia de eletrões</h3>
                        <p>Os eletrões percorrem proteínas da membrana; a energia bombeia H⁺ para dentro do tilacoide, criando um gradiente.</p>
                    </div>

                    <div class="info-card">
                        <h3>ATP e NADPH</h3>
                        <p>O gradiente de H⁺ impulsiona a <strong>ATP sintase</strong>, produzindo ATP. No fim da cadeia forma-se <strong>NADPH</strong>.</p>
                    </div>

                    <details class="mini-challenge">
                        <summary>🧩 Desafio: qual é a ordem correta?</summary>
                        <p>Luz na clorofila → fotólise da água → cadeia de eletrões → gradiente H⁺ → ATP + NADPH.</p>
                    </details>

                    <div class="info-card">
                        <h3>Sabias que...</h3>
                        <p>O oxigénio que respiramos vem, ao longo de milhões de anos, desta reação de fotólise da água.</p>
                    </div>
                </div>
            `,
            quiz: {
                question: "Onde ocorre a fase clara da fotossíntese e o que produz?",
                options: [
                    { text: "No estroma; produz glicose", correct: false },
                    { text: "Nos tilacoides; produz ATP e NADPH", correct: true },
                    { text: "No núcleo; produz ARN", correct: false },
                    { text: "Nos tilacoides; produz CO₂", correct: false }
                ],
                feedback: {
                    correct: "Correto! A fase clara ocorre nos tilacoides e produz ATP e NADPH a partir da energia luminosa.",
                    incorrect: "Revê onde está a clorofila. A fase clara acontece nos tilacoides e os seus produtos são ATP e NADPH."
                }
            }
        },
        {
            id: "do-ar-ao-acucar",
            title: "Do ar ao açúcar (ciclo de Calvin)",
            icon: "🍬",
            xpReward: 60,
            content: `
                <div class="section-content">
                    <h2>🍬 Do ar ao açúcar (ciclo de Calvin)</h2>
                    <p>Na secção anterior produziste ATP e NADPH. Agora entra o CO₂ para começar a construir açúcar.</p>

                    <div class="info-card">
                        <h3>Onde acontece</h3>
                        <p>O ciclo de Calvin ocorre no <strong>estroma</strong>, o fluido à volta dos tilacoides dentro do cloroplasto.</p>
                    </div>

                    <div class="info-card">
                        <h3>Fixação do carbono</h3>
                        <p>O CO₂ liga-se à <strong>RuBP</strong> com ajuda da enzima <strong>rubisco</strong>, formando compostos de 3 carbonos.</p>
                    </div>

                    <div class="info-card">
                        <h3>Redução</h3>
                        <p>ATP e NADPH (vindos da fase clara) convertem os compostos de 3C em <strong>G3P</strong> (gliceraldeído-3-fosfato).</p>
                    </div>

                    <div class="info-card">
                        <h3>Regeneração</h3>
                        <p>A maior parte do G3P regenera RuBP usando ATP; só uma pequena parte sai para formar glicose e outros açúcares.</p>
                    </div>

                    <details class="mini-challenge">
                        <summary>🧩 Desafio: completa o ciclo</summary>
                        <p>CO₂ + RuBP → (rubisco) → fixação → G3P → regeneração → RuBP (recomeça).</p>
                    </details>

                    <div class="info-card">
                        <h3>Sabias que...</h3>
                        <p>São precisas 6 voltas do ciclo de Calvin para produzir uma molécula de glicose.</p>
                    </div>
                </div>
            `,
            quiz: {
                question: "Que enzima fixa o CO₂ à RuBP no ciclo de Calvin, e onde ocorre este ciclo?",
                options: [
                    { text: "ATP sintase; nos tilacoides", correct: false },
                    { text: "Rubisco; no estroma", correct: true },
                    { text: "Rubisco; nos tilacoides", correct: false },
                    { text: "NADPH redutase; no estroma", correct: false }
                ],
                feedback: {
                    correct: "Exato! A rubisco é a enzima que fixa CO₂ à RuBP, e o ciclo de Calvin ocorre no estroma.",
                    incorrect: "Pista: a enzima mais abundante da Terra fixa CO₂ fora dos tilacoides, no fluido do cloroplasto."
                }
            }
        },
        {
            id: "liga-os-pontos",
            title: "Liga os pontos (síntese)",
            icon: "🔗",
            xpReward: 70,
            content: `
                <div class="section-content">
                    <h2>🔗 Liga os pontos (síntese)</h2>
                    <p>Agora ligamos as duas fases num único sistema interdependente.</p>

                    <div class="info-card">
                        <h3>O que a fase clara entrega</h3>
                        <p><strong>ATP</strong> e <strong>NADPH</strong> são transferidos da fase clara para o ciclo de Calvin como fonte de energia e eletrões.</p>
                    </div>

                    <div class="info-card">
                        <h3>O que Calvin devolve</h3>
                        <p><strong>ADP</strong> e <strong>NADP⁺</strong> (as versões descarregadas) voltam para a fase clara para serem recarregadas pela luz.</p>
                    </div>

                    <div class="info-card">
                        <h3>Um sistema único</h3>
                        <p>Se a fase clara parar, o Calvin esgota as suas reservas de ATP/NADPH e para também. As duas fases são inseparáveis.</p>
                    </div>

                    <details class="mini-challenge">
                        <summary>🧩 Revisão final</summary>
                        <p>Fase clara → ATP/NADPH → ciclo de Calvin → ADP/NADP⁺ → fase clara (ciclo contínuo).</p>
                    </details>

                    <div class="info-card reflection-card">
                        <h3>💭 Reflexão (não avaliada automaticamente)</h3>
                        <p>Porque dizemos que a fotossíntese é um <em>sistema</em> e não duas reações separadas?</p>
                        <textarea class="reflection-input" rows="3" placeholder="Escreve aqui a tua resposta..."></textarea>
                    </div>

                    <div class="info-card">
                        <h3>Sabias que...</h3>
                        <p>Com estomas fechados (por falta de água), pode faltar CO₂ e travar o Calvin mesmo com sol abundante.</p>
                    </div>
                </div>
            `,
            quiz: {
                question: "Se bloqueares completamente a fase clara, o que acontece ao ciclo de Calvin?",
                options: [
                    { text: "Continua normalmente, pois são independentes", correct: false },
                    { text: "Acelera para compensar", correct: false },
                    { text: "Para também, por falta de ATP e NADPH", correct: true },
                    { text: "Passa a usar O₂ em vez de ATP", correct: false }
                ],
                feedback: {
                    correct: "Perfeito! As duas fases são interdependentes: sem ATP e NADPH da fase clara, o Calvin não consegue funcionar.",
                    incorrect: "As duas fases dependem uma da outra. Sem a energia fornecida pela fase clara, o Calvin fica sem combustível."
                }
            }
        }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = missionData;
}
