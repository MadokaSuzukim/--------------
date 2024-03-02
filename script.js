    // jQueryを使用してページ読み込み時にアニメーションを表示
    $(document).ready(function() {
        $("main").slideDown(500);
    
        // 行動計画のSave クリックイベント
        $("#saveActionPlan").on("click", function(){
            const v = $("#actionPlan").val();
            localStorage.setItem("actionPlan", v);
            alert("保存しました");
        });
    
        // 行動計画のClear クリックイベント
        $("#clearActionPlan").on("click", function(){
            localStorage.removeItem("actionPlan");
            $("#actionPlan").val("");
            alert("削除しました");
        });
    
        // 環境設定フォームのSave クリックイベント
        $("#saveEnvironment").on("click", function(){
            const v = $("#environment").val();
            localStorage.setItem("environment", v);
            alert("保存しました");
        });
    
        // 環境設定フォームのClear クリックイベント
        $("#clearEnvironment").on("click", function(){
            localStorage.removeItem("environment");
            $("#environment").val("");
            alert("削除しました");
        });
    
        // 振り返りメッセージのSave クリックイベント
        $("#saveReflection").on("click", function(){
            const v = $("#reflection").val();
            localStorage.setItem("reflection", v);
            alert("保存しました");
        });
    
        // 振り返りメッセージのClear クリックイベント
        $("#clearReflection").on("click", function(){
            localStorage.removeItem("reflection");
            $("#reflection").val("");
            alert("削除しました");
        });
    
        // ページ読み込み時に行動計画の保存データを表示
        if(localStorage.getItem("actionPlan")){
            const v = localStorage.getItem("actionPlan");
            $("#actionPlan").val(v);
        }
    
        // ページ読み込み時に環境設定フォームの保存データを表示
        if(localStorage.getItem("environment")){
            const v = localStorage.getItem("environment");
            $("#environment").val(v);
        }
    
        // ページ読み込み時に振り返りメッセージの保存データを表示
        if(localStorage.getItem("reflection")){
            const v = localStorage.getItem("reflection");
            $("#reflection").val(v);
        }
    });


    $(document).ready(function() {
        $("main").slideDown(500);
    
        // Save クリックイベント
        $(".save-button").on("click", function(){
            const sectionId = $(this).closest('main').attr('id'); // クリックされたボタンが含まれるセクションのIDを取得
            const v = $("#" + sectionId + " textarea").val(); // クリックされたボタンが含まれるセクション内のtextareaの値を取得
            const currentDate = new Date().toLocaleDateString(); // 現在の日付を取得
            const key = `${sectionId}_${currentDate}`; // 日付情報を含めて一意のキーを作成
            localStorage.setItem(key, v); // ローカルストレージにデータを保存
            alert("保存しました");
        });
    
        // Clear クリックイベント
        $(".clear-button").on("click", function(){
            const sectionId = $(this).closest('main').attr('id'); // クリックされたボタンが含まれるセクションのIDを取得
            const currentDate = new Date().toLocaleDateString(); // 現在の日付を取得
            const key = `${sectionId}_${currentDate}`; // 日付情報を含めた保存されたデータのキーを作成
            localStorage.removeItem(key); // ローカルストレージからデータを削除
            $("#" + sectionId + " textarea").val(""); // 対応するtextareaの値をクリア
            alert("削除しました");
        });
    
        // ページ読み込み時に保存されたデータを表示
        $("main").each(function() {
            const sectionId = $(this).attr('id'); // 各セクションのIDを取得
            const currentDate = new Date().toLocaleDateString(); // 現在の日付を取得
            const key = `${sectionId}_${currentDate}`; // 日付情報を含めた保存されたデータのキーを作成
            const savedData = localStorage.getItem(key); // ローカルストレージからデータを取得
            if(savedData) {
                $("#" + sectionId + " textarea").val(savedData); // 対応するtextareaにデータを表示
            }
        });
    });

    
    // 背景画像の編集
    checkAndShowWelcomeBackMessage();
    const body = document.body;
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) {
        body.classList.add('morning');
    } else {
        body.classList.add('night');
        
    }

    // タイマー
    document.addEventListener('DOMContentLoaded', function() {
    var timeLeft = 60; // 1分を秒単位で計算
    var timerElement = document.getElementById('timer');

    if (!timerElement) {
        console.error('タイマー表示用の要素が見つかりません。');
        return;
    }
        var timerId = setInterval(function() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert('1分が経過しました。自分の時間を楽しんでください！');
        } else {
            timeLeft -= 1;
        }
    }, 1000); // 1秒ごとに更新
});

// 振り返り
$(document).ready(function() {
    showWelcomeBackMessage();
});
function showWelcomeBackMessage() {
    
}
function checkAndShowWelcomeBackMessage() {
    
}



// 用語集
// ボタン要素を取得
const buttons = document.querySelectorAll('.tooltip-button');
const tooltip = document.getElementById('tooltip');

// ボタンごとにクリックイベントを追加
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // ボタンのdata-term属性から単語を取得
        const term = button.getAttribute('data-term');
        // 単語に対応する説明を取得
        const description = getTermDescription(term);
        // 説明を表示
        tooltip.textContent = description;
    });
});
// 単語に対応する説明を取得する関数
function getTermDescription(term) {
    switch(term) {
        case '環境設定':
            return '環境設定は行動するときにできるだけ意思力を使わないで、自動的にできるような環境を作ること。「どの程度意思力を使わない方法にしたら良いのかがまだ分かってい」ないのは、まだ何もやっていないからです。概念を知れば、すぐに全てがわかるのではなく、概念を知って、概念を強化するために、具体的な事例を集めて、実際に検証し、繰り返すことで、始めて、他の事例にも応用可能になります。 スクワットは一例にすぎません。まずは「愚痴を言わない、言いそうになった」時の、代わりの行動をいくつかアイデアを書き出して、上から順に「どの程度意思力を使わない」かを検証し、自分に合ったもの（継続可能なもの）を探していくと良いです。日々の検証を楽しむことを忘れずに。'; // 環境設定に関する説明
        case 'メタ認知':
            return 'メタ認知は自分が認知（考えている・感じている）していることを客観的に把握すること。'; // メタ認知に関する説明
        default:
            return ''; // 該当する単語がない場合は空の文字列を返す
    }
 }



// 過去のデータ
// ページ読み込み時に保存されたデータを表示
document.addEventListener('DOMContentLoaded', function() {
    // リスト要素を取得
    const dataList = document.getElementById('data-list');

    // 30日前の日付を取得
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // ローカルストレージのデータを取得し、リストアイテムとして追加
    for (let i = 0; i < localStorage.length; i++) {
        // ローカルストレージのキーを取得
        const key = localStorage.key(i);

        // キーが特定の形式に一致する場合のみ処理を継続
        if (key.includes('_')) {
            // キーから日付とセクションIDを抽出
            const [sectionId, dateString] = key.split('_');

            // 対応するセクションが存在する場合のみ処理を継続
            if (document.getElementById(sectionId) && dateString) {
                // データの日付をDateオブジェクトに変換
                const date = new Date(dateString);

                // 現在の日付と30日前の日付を比較し、30日以内のデータのみ表示
                if (date >= thirtyDaysAgo) {
                    // データを取得
                    const data = localStorage.getItem(key);

                    // リストアイテムを作成
                    const listItem = document.createElement('li');
                    listItem.textContent = `${dateString}: ${data}`;

                    // リストに追加
                    dataList.appendChild(listItem);
                }
            }
        }
    }
});

// チェックリスト
document.addEventListener('DOMContentLoaded', function() {
    // 追加ボタン要素を取得
    const addRoutineBtn = document.getElementById('addRoutineBtn');
    // 削除ボタン要素を取得
    const deleteRoutineBtn = document.getElementById('deleteRoutineBtn');
    // 保存ボタン要素を取得
    const saveRoutineBtn = document.getElementById('saveRoutineBtn');

    // 追加ボタンがクリックされたときの処理を追加
    addRoutineBtn.addEventListener('click', function() {
        addNewRoutine();
    });

    // 保存ボタンがクリックされたときの処理を追加
    saveRoutineBtn.addEventListener('click', function() {
        saveSelectedRoutine();
    });

    // 新しい習慣を追加する関数
    function addNewRoutine() {
        // 入力された新しい習慣を取得
        const newRoutine = document.getElementById('newRoutineInput').value.trim();
        if (newRoutine === '') {
            alert('新しい習慣を入力してください');
            return;
        }
        // 新しい習慣をリストに追加
        addRoutineToList(newRoutine);
        // 新しい習慣をローカルストレージに保存
        saveRoutineToLocalStorage(newRoutine);
        // 入力欄をクリア
        document.getElementById('newRoutineInput').value = '';
    }

    // 新しい習慣をリストに追加する関数
    function addRoutineToList(routine) {
        // リストコンテナ要素を取得
        const checkboxContainer = document.getElementById('checkboxContainer');

        // 新しい習慣のHTML要素を作成
        const newRoutineCheckbox = document.createElement('div');
        newRoutineCheckbox.classList.add('checkbox-container');

        // チェックボックス要素を作成
        const newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.name = 'routine';
        newCheckbox.value = routine;

        // ラベル要素を作成
        const newLabel = document.createElement('label');
        newLabel.htmlFor = routine;
        newLabel.textContent = routine;

        // チェックボックスとラベルを新しい習慣のHTML要素に追加
        newRoutineCheckbox.appendChild(newCheckbox);
        newRoutineCheckbox.appendChild(newLabel);

        // 新しい習慣のHTML要素をリストの最初に追加
        checkboxContainer.insertBefore(newRoutineCheckbox, checkboxContainer.firstChild);
    }

    // 新しい習慣をローカルストレージに保存する関数
    function saveRoutineToLocalStorage(routine) {
        // ローカルストレージから現在の習慣リストを取得
        const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];

        // 新しい習慣をリストに追加
        savedRoutines.unshift(routine); // 新しい習慣を配列の最初に追加

        // 更新された習慣リストをローカルストレージに保存
        localStorage.setItem('routines', JSON.stringify(savedRoutines));

        // ユーザーに通知
        alert('新しい習慣を追加しました');
    }

    // 保存ボタンがクリックされたときの処理を追加
    function saveSelectedRoutine() {
        const checkboxes = document.querySelectorAll('input[name="routine"]:checked');
        const selectedRoutines = Array.from(checkboxes).map(checkbox => checkbox.value);

        localStorage.setItem('selectedRoutines', JSON.stringify(selectedRoutines));

        alert('選択した習慣を保存しました');
    }
});
// マスコットの現在の画像インデックス
let currentMascotIndex = 0;

// マスコットの画像パスのリスト
const mascotImages = [
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png'
];
// マスコットの状態を更新する関数
function updateMascotState() {
    // 現在のマスコットの画像を取得
    const mascotImage = document.getElementById('mascotImage');

    // 現在の画像インデックスがリストの範囲内にあるか確認
    if (currentMascotIndex >= 0 && currentMascotIndex < mascotImages.length) {
        // 画像を更新
        mascotImage.src = mascotImages[currentMascotIndex];
        // ローカルストレージに成長段階を保存
        saveMascotState();
        // 画像インデックスを次に進める
        currentMascotIndex = (currentMascotIndex + 1) % mascotImages.length;

        // モーダル表示
        showCongratulationModal(); // お祝いのモーダルウィンドウを表示
    }
}

// 進捗を更新する関数（項目に答えるたびに呼び出す）
function updateProgress() {
    progress++; // 進捗を更新
    if (progress >= totalItems) {
        // 全ての項目に答えたら
        currentMascotIndex++; // マスコットの成長段階を上げる
        updateMascotState(); // マスコットの状態を更新
        showCongratulationModal(); // お祝いのモーダルウィンドウを表示
    }
}

// // マスコットの状態を更新する関数（成長段階に応じて）
// function updateMascotState() {
//     // 成長段階に応じてマスコットの画像や状態を更新するロジックをここに実装
// }

// // マスコットの状態を更新する関数
// function updateMascotState() {
//     // 現在のマスコットの画像を取得
//     const mascotImage = document.getElementById('mascotImage');

//     // 現在の画像インデックスがリストの範囲内にあるか確認
//     if (currentMascotIndex >= 0 && currentMascotIndex < mascotImages.length) {
//         // 画像を更新
//         mascotImage.src = mascotImages[currentMascotIndex];
//         // 画像インデックスを次に進める
//         currentMascotIndex = (currentMascotIndex + 1) % mascotImages.length;

//         // モーダル表示
//         showCongratulationModal(); // お祝いのモーダルウィンドウを表示
//     }
// }

// 入力があった場合に呼び出される関数
function onInput() {
    const currentDate = new Date().toLocaleDateString(); // 現在の日付を取得

// 最後の入力日付が本日ではない場合、つまり今日初めての入力の場合
    if (lastInputDate !== currentDate) {
        lastInputDate = currentDate; // 最後の入力日付を更新
        currentStage++; // マスコットの成長段階を上げる
        updateMascotState(); // マスコットの状態を更新
        showCongratulationModal(); // お祝いのモーダルウィンドウを表示
    }
}
// お祝いモーダル表示
function showCongratulationModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div>Congratulations! </div>
        <div>おめでとう! あなたのマスコットが成長したよ!</div>
        <button id="closeModalButton">閉じる</button>
    `;
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.border = '1px solid black';
    document.body.appendChild(modal);
// モーダルが表示されたら、ローカルストレージに表示状態を保存
localStorage.setItem('modalState', true);

// 閉じるボタンにクリックイベントリスナーを追加
const closeModalButton = document.getElementById('closeModalButton');
closeModalButton.addEventListener('click', function() {
    // モーダルを非表示にする
    modal.style.display = 'none';
    // モーダルの表示状態をリセットする
    resetModalState();
});
}


// モーダルの非表示状態をリセットする関数
function resetModalState() {
localStorage.removeItem('modalState');
}

// 保存ボタンにクリックイベントリスナーを追加
document.getElementById("saveEnvironment").addEventListener("click", function() {
// テキストエリアから環境設定を取得
    const environmentText = document.getElementById("environment").value;

// マスコットの成長状態を更新する関数を呼び出す
    updateMascotByEnvironment(environmentText);
});
// マスコットの成長状態を更新する関数
function updateMascotByEnvironment(environmentText) {
    // environmentTextに基づいてマスコットの成長状態を更新するロジックを実装
    // ここでは仮にマスコットの成長段階を進める関数updateMascotState()を呼び出すものとします
    updateMascotState();

    // 成長後のモーダルを表示する
    showCongratulationModal();
}

// マスコットの成長状態を更新する関数
function updateMascotByEnvironment(environmentText) {
    // environmentTextに基づいてマスコットの成長状態を更新するロジックを実装
    // ここでは仮にマスコットの成長段階を進める関数updateMascotState()を呼び出すものとします
    updateMascotState();
}
// 保存ボタンにクリックイベントリスナーを追加
document.getElementById("saveEnvironment").addEventListener("click", function() {
    // テキストエリアから環境設定を取得
    const environmentText = document.getElementById("environment").value;

    // マスコットの成長状態を更新する関数を呼び出す
    updateMascotByEnvironment(environmentText);
});
// マスコットの成長段階を保存するキー
const mascotStateKey = 'mascotState';

// ローカルストレージから成長段階を取得する関数
function getMascotState() {
    return localStorage.getItem(mascotStateKey);
}

// ローカルストレージに成長段階を保存する関数
function setMascotState(state) {
    localStorage.setItem(mascotStateKey, state);
}

// ページ読み込み時に成長段階を復元する関数
function restoreMascotState() {
    const savedState = getMascotState();
    if (savedState !== null) {
        // ローカルストレージから成長段階を取得して、マスコットの状態を更新する
        currentMascotIndex = parseInt(savedState);
        updateMascotState();
    }
}

// マスコットの成長段階を保存する関数
function saveMascotState() {
    // マスコットの現在の成長段階を保存
    setMascotState(currentMascotIndex.toString());
}

// ページ読み込み時に成長段階を復元
restoreMascotState();

// 語録の配列を初期化
const quotes = [
    "一口サイズでいいんやで",
    "すーさんの今日１日語録"+"毎日の積み重ねやで。ほなやろか",
    "継続した事だけが身につくんやで",
    "あれ？そこまで進んでるん！？",
    "頑張るってどういう事なんやろうね〜",
    "お前さんはお前さんよ。",
    "今日もいい日やったかい？一歩ずつ一歩ずつ",
    "気づいたら早いでよ。選択肢は狭ければ 狭いほどいいんやで",
    "すーさんの今日１日語録"+"どう生きるかなんて、皆ちゃうからなー",
    "いらん努力してないやろか？",
    "おおきに！見とるからなー",
    "出来ひんかった後悔せんと、明日どう動くか考えよ。",
    // 他の語録をここに追加
];

// ランダムに語録を選ぶ関数
function getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

// 語録をポップアップ表示する関数
function showRandomQuote() {
    const quote = getRandomQuote();
    
    // カスタムポップアップの作成
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div>${quote}</div>
        <button id="okButton">OK</button>
    `;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'gray';
    popup.style.padding = '50px';
    popup.style.border = '1px solid black';
    document.body.appendChild(popup);

    // OKボタンをクリックしたときのイベントリスナー
    const okButton = document.getElementById("okButton");
    okButton.addEventListener("click", function okButtonClicked() {
        // 音楽再生
        playBackgroundMusicOnClick();
        // ポップアップの削除
        document.body.removeChild(popup);
        // OKボタンのクリックイベントを削除
        okButton.removeEventListener("click", okButtonClicked);
    });
}

// 例として関数を実行
showRandomQuote();

// ボタンをクリックしたときに音声を再生する関数
function playBackgroundMusicOnClick() {
    var backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.play().catch(error => {
        // ユーザーの対話なしに再生しようとした場合のエラー処理
        console.error("バックグラウンドミュージックの再生に失敗しました:", error);
    });
}

// ボタンにクリックイベントを追加して音声を再生する
document.getElementById("okButton").addEventListener("click", playBackgroundMusicOnClick);

// ミュート切り替えの関数
function toggleMute() {
    var backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.muted = !backgroundMusic.muted;
    var muteButton = document.getElementById("muteButton");
    if (muteButton) { // muteButtonがnullでないことを確認する
        muteButton.textContent = backgroundMusic.muted ? "音を出す" : "音を消す";
    } else {
        console.error("muteButtonが見つかりません。");
    }
}