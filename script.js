
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-item');
    const saveBtn = document.getElementById('save-reflection')
    // const morningRoutine = document.getElementById('morning-routine');
    const reflection = document.getElementById('reflection');
    
    
    // スコープの問題を解決する： もしmorningRoutineが特定の関数内でのみ定義されている場合は、それを関数外で定義し、必要な関数からアクセスできるようにする
    let morningRoutine; // グローバルスコープで定義
    function loadMorningRoutine() {
        // 保存されたルーチンをロード
        const items = JSON.parse(localStorage.getItem('morningRoutine')) || [];
        items.forEach(itemText => {
            addRoutineItem(itemText, false);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        morningRoutine = document.getElementById('morning-routine');
        function addRoutineItem(itemText, save = true) {
            const li = document.createElement('li');
            li.textContent = itemText;
            morningRoutine.appendChild(li);
        
                // ローカルストレージに保存
                if (save) {
                    const items = JSON.parse(localStorage.getItem('morningRoutine')) || [];
                    items.push(itemText);
                    localStorage.setItem('morningRoutine', JSON.stringify(items));
                }
            }
        
    });

    // 反省を保存
    saveBtn.addEventListener('click', () => {
        const today = new Date().toLocaleDateString('ja-JP'); // 日本の日付形式で取得
        const reflectionWithDate = {
            date: today,
            text: reflection.value
        };
        localStorage.setItem('reflection', JSON.stringify(reflectionWithDate));
        alert('保存しました');
    });
    
    // jQueryを使用してページ読み込み時にアニメーションを表示
    $("main").slideDown(500);
    
    // Save クリックイベント
    $("#save").on("click", function(){
        const v = $("#textarea").val();
        localStorage.setItem("memo", v);
        alert("保存しました");
    });

    // Clear クリックイベント
    $("#clear").on("click", function(){
        localStorage.removeItem("memo");
        $("#textarea").val("");
        alert("削除しました");
    });

    // ページ読み込み時に保存データを表示
    if(localStorage.getItem("memo")){
        const v = localStorage.getItem("memo");
        $("#textarea").val(v);
    }
});

// 夜になったら「おかえり」メッセージを表示
function showWelcomeBackMessage() {
    const welcomeBackMessage = document.getElementById('welcome-back-message');
    if (!welcomeBackMessage) return; // この行で要素がnullであれば、関数の残りの部分は実行されません
    const yesButton = document.getElementById('yes-button');
    const currentHour = new Date().getHours();

    // 仮に18時以降を「夜」とします。
    if (currentHour >= 18 && welcomeBackMessage) { // welcomeBackMessageがnullでないことを再確認
        welcomeBackMessage.style.display = 'block';
        yesButton.addEventListener('click', () => {
            reflection.focus(); // テキストエリアにフォーカス
        });
    }
}
 // 背景を朝と夜とで変える
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const hour = new Date().getHours();
        
    if (hour >= 6 && hour < 18) {
            // 朝6時から夜18時までは朝の背景
            body.classList.add('morning');
    } else {
            // 夜18時から朝6時までは夜の背景
             body.classList.add('night');
            }
        });  


// 語録の配列
const quotes = [
    "すーさんの今日１日語録"+"一口サイズでいいんやで",
    "すーさんの今日１日語録"+"毎日の積み重ねやで。ほなやろか",
    "すーさんの今日１日語録"+"継続した事だけが身につくんやで",
    "すーさんの今日１日語録"+"あれ？そこまで進んでるん！？",
    "すーさんの今日１日語録"+"頑張るってどういう事なんやろうね〜",
    "すーさんの今日１日語録"+"お前さんはお前さんよ。",
    "すーさんの今日１日語録"+"今日もいい日やったかい？一歩ずつ一歩ずつ",
    "すーさんの今日１日語録"+"気づいたら早いでよ。選択肢は狭ければ 狭いほどいいんやで",
    "すーさんの今日１日語録"+"どう生きるかなんて、皆ちゃうからなー",
    "すーさんの今日１日語録"+"いらん努力してないやろか？",
    "すーさんの今日１日語録"+"おおきに！見とるからなー",
    "すーさんの今日１日語録"+"出来ひんかった後悔せんと、明日どう動くか考えよ。",
    // 他にも追加
];

// ランダムに語録を選ぶ関数
function getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

// 語録をポップアップ表示する関数
function showRandomQuote() {
    const quote = getRandomQuote();
    alert(quote); // カスタムポップアップに置き換えることも可能
}

// 保存ボタンクリック時のイベントハンドラを設定
document.getElementById('save-settings').addEventListener('click', () => {
    // ここで環境設定を保存するコードを追加することもできます
    // 例: localStorage.setItem('setting', document.getElementById('setting-input').value);

    // 語録ポップアップを表示
    showRandomQuote();
});

// タイマー
document.addEventListener('DOMContentLoaded', function() {
    var timeLeft = 3 * 60; // 5分を秒単位で計算
    var timerElement = document.getElementById('timer');

    var timerId = setInterval(function() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        // 分と秒が10未満の場合は、先頭に0を追加する
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // タイマーを更新
        timerElement.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert('3分が経過しました。自分の時間を楽しんでください！');
        } else {
            timeLeft -= 1;
        }
    }, 1000); // 1秒ごとに更新
});