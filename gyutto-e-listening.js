// ==UserScript==
// @name         autoRespondToGyuttoE
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match     https://yaruzo2.gyuto-e.jp/fukui/webapi/lesson/listening
// @match     https://yaruzo2.gyuto-e.jp/fukui/webapi/lesson/listening/start
// ==/UserScript==
main();

async function main(){
    let selected;

    await makeDelay(5000, 10000);//実行の遅延
    deleteAlert();//alert関数の無効化
    selected = randomAnswer(-1);//回答する答えの保存
    sendAnswer();//回答を送信
    await makeDelay(1000, 1000);
    await checkAnswer(selected);
    await makeDelay(1000, 1000);
    moveNext();
}

//以下、関数定義
function deleteAlert(){
    document.defaultView.alert = () => {};
}

async function makeDelay(min, max){
    let delayTime = Math.random() * (max - min) + min; //min以上max以下で遅延時間を設定(単位msec)
    let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, delayTime);//遅延させる
    });
    await promise;
    return promise;
}

function randomAnswer(incorrect){
    let max = document.getElementsByClassName("k_label").length;//選択肢の個数を取得
    let randomIndex;
    while((randomIndex = getRandomInt(0, max)) == incorrect){}//（２回目以降は）前回間違えた選択肢以外を選ぶ
    document.getElementsByClassName("k_label")[randomIndex].click(); //選択肢をクリック
    return randomIndex;
}

function sendAnswer(){
    document.getElementsByClassName("btn k_btn_f btn-danger")[0].click(); //回答ボタンをクリック
}

async function checkAnswer(incorrect){
    let target = document.getElementsByClassName("btn-danger")[0];
    let target2 = document.getElementsByClassName("k_btn_move")[0];
    if(target != undefined){
        if(target.textContent == "採点する"){//不正解の場合
            await makeDelay(5000, 10000);//実行の遅延
            randomAnswer(incorrect);//回答する答えの保存
            sendAnswer();//回答を送信
            return new Promise((resolve, reject) =>{resolve()});
        }
    }
    if(target2 != undefined){
        if(target2.textContent == "次の課題へ"){
            return new Promise((resolve, reject) =>{resolve()});
        }
    }
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function moveNext(){
    document.getElementsByClassName("btn k_btn_f k_btn_move")[0].click();
}







