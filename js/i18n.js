/** MapMapMaps UI strings — one glossary across locales. */
(function (global) {
  /**
   * Glossary (keep aligned in every locale):
   * - Score — HUD chip above the point total
   * - Game — one session of 5 panoramas
   * - Panorama — one of the 5 views
   * - Guess — submit an answer
   * - Place / pin — map marker
   * Prefer full words over abbreviations in player-facing copy.
   */
  const STRINGS = {
    en: {
      metaDescription:
        "MapMapMaps — free GeoGuessr-style game on Mapillary 360° panoramas. No paid APIs.",
      pageTitle: "MapMapMaps — Guess the location",
      runLabel: "Score",
      progressAria: "Game progress",
      stopOf: "Panorama {n} of {total}",
      runComplete: "Game complete",
      stopCleared: "Panorama {n} complete",
      pts: "points",
      ptsTotal: "Total {score}",
      distanceM: "{d} meters away",
      distanceKm1: "{d} km away",
      distanceKm: "{d} km away",
      milesParen: "({d} mi)",
      placeholderGuess: "City or country…",
      guess: "Guess",
      newSpot: "New place",
      pickOnMap: "Pick on map",
      closeMap: "Close map",
      streetView: "← Street view",
      dropPin: "Drop a pin on the map",
      clearPin: "Clear pin",
      yourGuess: "Your guess",
      actual: "Actual place",
      continue: "Continue",
      nextStop: "Next panorama →",
      finishRun: "Finish game",
      donate: "Donate",
      donateTitle: "Support MapMapMaps",
      gameComplete: "Game complete!",
      thisGame: "This game",
      personalBest: "Personal best",
      playAgain: "Play again",
      firstComplete: "First game complete!",
      firstCompleteSub: "Your score is saved on this device. Beat it next time!",
      newBest: "New personal best!",
      beatRecord: "You beat your previous record of {score}.",
      awayFromRecord: "{diff} away from your record — try again!",
      greatRun: "Nice game! See if you can go even higher.",
      cheerPerfect: "Perfect!",
      cheerBrilliant: "Brilliant!",
      cheerGreat: "Great job!",
      cheerNice: "Nice!",
      cheerKeep: "Keep going!",
      cheerNext: "You'll get it next time!",
      toastPin: "Pin placed — press Guess",
      toastTypeOrMap: "Type a city or pick on the map",
      toastPinCleared: "Pin cleared",
      toastLoadFailed: "Could not load the panorama",
      toastGuessFailed: "Could not submit your guess",
      mapPin: "Map pin",
      unknown: "Unknown",
      errGeocoderBusy: "Search is busy — wait a moment",
      errGeocoder: "Search error ({status})",
      errPlaceNotFound: "Place not found — try another spelling",
      errViewerConfig: "Could not open the panorama viewer",
      errLoadLocation: "Could not load this location",
      errNonPano: "This is not a 360° panorama",
      errViewer: "Panorama viewer error",
      errSdk: "Failed to load Mapillary or MapLibre",
      errRound: "Could not start a new panorama",
      errStartup: "Could not start MapMapMaps. Please try again later.",
      sfxMute: "Mute sounds",
      sfxUnmute: "Unmute sounds",
    },
    ru: {
      metaDescription:
        "MapMapMaps — бесплатная игра в стиле GeoGuessr на панорамах Mapillary 360°.",
      pageTitle: "MapMapMaps — Угадай место",
      runLabel: "Счёт",
      progressAria: "Прогресс игры",
      stopOf: "Панорама {n} из {total}",
      runComplete: "Игра завершена",
      stopCleared: "Панорама {n} завершена",
      pts: "очков",
      ptsTotal: "Всего {score}",
      distanceM: "{d} метров",
      distanceKm1: "{d} километра",
      distanceKm: "{d} километров",
      milesParen: "({d} миль)",
      placeholderGuess: "Город или страна…",
      guess: "Угадать",
      newSpot: "Другое место",
      pickOnMap: "Выбрать на карте",
      closeMap: "Закрыть карту",
      streetView: "← К панораме",
      dropPin: "Поставьте метку на карте",
      clearPin: "Убрать метку",
      yourGuess: "Ваш ответ",
      actual: "Верное место",
      continue: "Дальше",
      nextStop: "Следующая панорама →",
      finishRun: "Завершить игру",
      donate: "Поддержать",
      donateTitle: "Поддержать MapMapMaps",
      gameComplete: "Игра завершена!",
      thisGame: "Счёт за игру",
      personalBest: "Личный рекорд",
      playAgain: "Играть снова",
      firstComplete: "Первое прохождение!",
      firstCompleteSub:
        "Результат сохранён на этом устройстве. Попробуйте побить его в следующий раз!",
      newBest: "Новый личный рекорд!",
      beatRecord: "Вы улучшили прошлый результат: {score}.",
      awayFromRecord: "До рекорда осталось {diff} — попробуйте ещё!",
      greatRun: "Отличная игра! Можно набрать ещё больше.",
      cheerPerfect: "Идеально!",
      cheerBrilliant: "Блестяще!",
      cheerGreat: "Отлично!",
      cheerNice: "Неплохо!",
      cheerKeep: "Так держать!",
      cheerNext: "В следующий раз получится!",
      toastPin: "Метка стоит — нажмите «Угадать»",
      toastTypeOrMap: "Введите город или выберите место на карте",
      toastPinCleared: "Метка убрана",
      toastLoadFailed: "Не удалось загрузить панораму",
      toastGuessFailed: "Не удалось отправить ответ",
      mapPin: "Метка на карте",
      unknown: "Неизвестно",
      errGeocoderBusy: "Поиск занят — подождите немного",
      errGeocoder: "Ошибка поиска ({status})",
      errPlaceNotFound: "Место не найдено — проверьте написание",
      errViewerConfig: "Не удалось открыть просмотр панорамы",
      errLoadLocation: "Не удалось загрузить это место",
      errNonPano: "Это не панорама 360°",
      errViewer: "Ошибка просмотра панорамы",
      errSdk: "Не загрузились Mapillary или MapLibre",
      errRound: "Не удалось начать новую панораму",
      errStartup: "Не удалось запустить MapMapMaps. Попробуйте позже.",
      sfxMute: "Выключить звук",
      sfxUnmute: "Включить звук",
    },
    es: {
      metaDescription:
        "MapMapMaps — juego gratis estilo GeoGuessr con panoramas 360° de Mapillary.",
      pageTitle: "MapMapMaps — Adivina el lugar",
      runLabel: "Puntos",
      progressAria: "Progreso de la partida",
      stopOf: "Panorama {n} de {total}",
      runComplete: "Partida terminada",
      stopCleared: "Panorama {n} terminado",
      pts: "puntos",
      ptsTotal: "Total {score}",
      distanceM: "a {d} metros",
      distanceKm1: "a {d} km",
      distanceKm: "a {d} km",
      milesParen: "({d} mi)",
      placeholderGuess: "Ciudad o país…",
      guess: "Adivinar",
      newSpot: "Otro lugar",
      pickOnMap: "Elegir en el mapa",
      closeMap: "Cerrar mapa",
      streetView: "← Volver a la calle",
      dropPin: "Coloca una marca en el mapa",
      clearPin: "Quitar marca",
      yourGuess: "Tu respuesta",
      actual: "Lugar real",
      continue: "Continuar",
      nextStop: "Siguiente panorama →",
      finishRun: "Terminar partida",
      donate: "Donar",
      donateTitle: "Apoyar MapMapMaps",
      gameComplete: "¡Partida terminada!",
      thisGame: "Esta partida",
      personalBest: "Mejor marca personal",
      playAgain: "Jugar de nuevo",
      firstComplete: "¡Primera partida!",
      firstCompleteSub: "Tu puntuación se guarda en este dispositivo. ¡Supérala la próxima vez!",
      newBest: "¡Nuevo récord personal!",
      beatRecord: "Superaste tu récord anterior de {score}.",
      awayFromRecord: "Te faltan {diff} para el récord — ¡inténtalo de nuevo!",
      greatRun: "¡Buena partida! Aún puedes subir más.",
      cheerPerfect: "¡Perfecto!",
      cheerBrilliant: "¡Brillante!",
      cheerGreat: "¡Buen trabajo!",
      cheerNice: "¡Bien!",
      cheerKeep: "¡Sigue así!",
      cheerNext: "¡La próxima lo logras!",
      toastPin: "Marca colocada — pulsa Adivinar",
      toastTypeOrMap: "Escribe una ciudad o elige en el mapa",
      toastPinCleared: "Marca quitada",
      toastLoadFailed: "No se pudo cargar el panorama",
      toastGuessFailed: "No se pudo enviar la respuesta",
      mapPin: "Marca en el mapa",
      unknown: "Desconocido",
      errGeocoderBusy: "La búsqueda está ocupada — espera un momento",
      errGeocoder: "Error de búsqueda ({status})",
      errPlaceNotFound: "Lugar no encontrado — prueba otra ortografía",
      errViewerConfig: "No se pudo abrir el visor de panoramas",
      errLoadLocation: "No se pudo cargar este lugar",
      errNonPano: "Esto no es un panorama 360°",
      errViewer: "Error del visor de panoramas",
      errSdk: "No se cargó Mapillary o MapLibre",
      errRound: "No se pudo iniciar un panorama nuevo",
      errStartup: "No se pudo iniciar MapMapMaps. Inténtalo más tarde.",
      sfxMute: "Silenciar",
      sfxUnmute: "Activar sonido",
    },
    de: {
      metaDescription:
        "MapMapMaps — kostenloses GeoGuessr-Spiel mit Mapillary-360°-Panoramen.",
      pageTitle: "MapMapMaps — Ort erraten",
      runLabel: "Punkte",
      progressAria: "Spielfortschritt",
      stopOf: "Panorama {n} von {total}",
      runComplete: "Spiel beendet",
      stopCleared: "Panorama {n} beendet",
      pts: "Punkte",
      ptsTotal: "Gesamt {score}",
      distanceM: "{d} Meter entfernt",
      distanceKm1: "{d} km entfernt",
      distanceKm: "{d} km entfernt",
      milesParen: "({d} mi)",
      placeholderGuess: "Stadt oder Land…",
      guess: "Raten",
      newSpot: "Anderer Ort",
      pickOnMap: "Auf der Karte wählen",
      closeMap: "Karte schließen",
      streetView: "← Zurück zur Straße",
      dropPin: "Setze eine Markierung auf der Karte",
      clearPin: "Markierung entfernen",
      yourGuess: "Deine Schätzung",
      actual: "Tatsächlicher Ort",
      continue: "Weiter",
      nextStop: "Nächstes Panorama →",
      finishRun: "Spiel beenden",
      donate: "Spenden",
      donateTitle: "MapMapMaps unterstützen",
      gameComplete: "Spiel beendet!",
      thisGame: "Dieses Spiel",
      personalBest: "Persönlicher Rekord",
      playAgain: "Nochmal spielen",
      firstComplete: "Erstes Spiel geschafft!",
      firstCompleteSub: "Dein Ergebnis wird auf diesem Gerät gespeichert. Schlage es beim nächsten Mal!",
      newBest: "Neuer persönlicher Rekord!",
      beatRecord: "Du hast deinen bisherigen Rekord von {score} übertroffen.",
      awayFromRecord: "Noch {diff} bis zum Rekord — versuch es noch einmal!",
      greatRun: "Starkes Spiel! Du kannst noch höher kommen.",
      cheerPerfect: "Perfekt!",
      cheerBrilliant: "Brillant!",
      cheerGreat: "Gut gemacht!",
      cheerNice: "Schön!",
      cheerKeep: "Weiter so!",
      cheerNext: "Beim nächsten Mal klappt es!",
      toastPin: "Markierung gesetzt — auf Raten tippen",
      toastTypeOrMap: "Stadt eingeben oder auf der Karte wählen",
      toastPinCleared: "Markierung entfernt",
      toastLoadFailed: "Panorama konnte nicht geladen werden",
      toastGuessFailed: "Antwort konnte nicht gesendet werden",
      mapPin: "Kartenmarkierung",
      unknown: "Unbekannt",
      errGeocoderBusy: "Suche ist beschäftigt — kurz warten",
      errGeocoder: "Suchfehler ({status})",
      errPlaceNotFound: "Ort nicht gefunden — andere Schreibweise versuchen",
      errViewerConfig: "Panorama-Ansicht konnte nicht geöffnet werden",
      errLoadLocation: "Ort konnte nicht geladen werden",
      errNonPano: "Das ist kein 360°-Panorama",
      errViewer: "Fehler in der Panorama-Ansicht",
      errSdk: "Mapillary oder MapLibre konnte nicht geladen werden",
      errRound: "Neues Panorama konnte nicht gestartet werden",
      errStartup: "MapMapMaps konnte nicht gestartet werden. Bitte später erneut versuchen.",
      sfxMute: "Ton aus",
      sfxUnmute: "Ton an",
    },
    fr: {
      metaDescription:
        "MapMapMaps — jeu gratuit façon GeoGuessr sur panoramas 360° Mapillary.",
      pageTitle: "MapMapMaps — Devinez le lieu",
      runLabel: "Score",
      progressAria: "Progression de la partie",
      stopOf: "Panorama {n} sur {total}",
      runComplete: "Partie terminée",
      stopCleared: "Panorama {n} terminé",
      pts: "points",
      ptsTotal: "Total {score}",
      distanceM: "à {d} mètres",
      distanceKm1: "à {d} km",
      distanceKm: "à {d} km",
      milesParen: "({d} mi)",
      placeholderGuess: "Ville ou pays…",
      guess: "Deviner",
      newSpot: "Autre lieu",
      pickOnMap: "Choisir sur la carte",
      closeMap: "Fermer la carte",
      streetView: "← Retour à la rue",
      dropPin: "Placez un repère sur la carte",
      clearPin: "Effacer le repère",
      yourGuess: "Votre réponse",
      actual: "Lieu réel",
      continue: "Continuer",
      nextStop: "Panorama suivant →",
      finishRun: "Terminer la partie",
      donate: "Faire un don",
      donateTitle: "Soutenir MapMapMaps",
      gameComplete: "Partie terminée !",
      thisGame: "Cette partie",
      personalBest: "Record personnel",
      playAgain: "Rejouer",
      firstComplete: "Première partie terminée !",
      firstCompleteSub: "Votre score est enregistré sur cet appareil. Battez-le la prochaine fois !",
      newBest: "Nouveau record personnel !",
      beatRecord: "Vous avez battu votre précédent record de {score}.",
      awayFromRecord: "Encore {diff} pour battre le record — réessayez !",
      greatRun: "Belle partie ! Vous pouvez encore faire mieux.",
      cheerPerfect: "Parfait !",
      cheerBrilliant: "Brillant !",
      cheerGreat: "Beau travail !",
      cheerNice: "Bien !",
      cheerKeep: "Continuez !",
      cheerNext: "Vous y arriverez la prochaine fois !",
      toastPin: "Repère placé — appuyez sur Deviner",
      toastTypeOrMap: "Saisissez une ville ou choisissez sur la carte",
      toastPinCleared: "Repère effacé",
      toastLoadFailed: "Impossible de charger le panorama",
      toastGuessFailed: "Impossible d’envoyer la réponse",
      mapPin: "Repère sur la carte",
      unknown: "Inconnu",
      errGeocoderBusy: "Recherche occupée — patientez un instant",
      errGeocoder: "Erreur de recherche ({status})",
      errPlaceNotFound: "Lieu introuvable — essayez une autre orthographe",
      errViewerConfig: "Impossible d’ouvrir la visionneuse",
      errLoadLocation: "Impossible de charger ce lieu",
      errNonPano: "Ce n’est pas un panorama 360°",
      errViewer: "Erreur de la visionneuse",
      errSdk: "Échec du chargement de Mapillary ou MapLibre",
      errRound: "Impossible de démarrer un nouveau panorama",
      errStartup: "Impossible de lancer MapMapMaps. Réessayez plus tard.",
      sfxMute: "Couper le son",
      sfxUnmute: "Activer le son",
    },
    pt: {
      metaDescription:
        "MapMapMaps — jogo grátis estilo GeoGuessr com panoramas 360° do Mapillary.",
      pageTitle: "MapMapMaps — Adivinhe o lugar",
      runLabel: "Pontuação",
      progressAria: "Progresso do jogo",
      stopOf: "Panorama {n} de {total}",
      runComplete: "Jogo concluído",
      stopCleared: "Panorama {n} concluído",
      pts: "pontos",
      ptsTotal: "Total {score}",
      distanceM: "a {d} metros",
      distanceKm1: "a {d} km",
      distanceKm: "a {d} km",
      milesParen: "({d} mi)",
      placeholderGuess: "Cidade ou país…",
      guess: "Adivinhar",
      newSpot: "Outro lugar",
      pickOnMap: "Escolher no mapa",
      closeMap: "Fechar mapa",
      streetView: "← Voltar à rua",
      dropPin: "Coloque um marcador no mapa",
      clearPin: "Remover marcador",
      yourGuess: "Seu palpite",
      actual: "Lugar real",
      continue: "Continuar",
      nextStop: "Próximo panorama →",
      finishRun: "Terminar jogo",
      donate: "Doar",
      donateTitle: "Apoiar MapMapMaps",
      gameComplete: "Jogo concluído!",
      thisGame: "Este jogo",
      personalBest: "Recorde pessoal",
      playAgain: "Jogar de novo",
      firstComplete: "Primeiro jogo concluído!",
      firstCompleteSub: "Sua pontuação fica salva neste dispositivo. Supere-a na próxima!",
      newBest: "Novo recorde pessoal!",
      beatRecord: "Você superou seu recorde anterior de {score}.",
      awayFromRecord: "Faltam {diff} para o recorde — tente de novo!",
      greatRun: "Ótimo jogo! Dá para ir ainda mais longe.",
      cheerPerfect: "Perfeito!",
      cheerBrilliant: "Brilhante!",
      cheerGreat: "Muito bem!",
      cheerNice: "Boa!",
      cheerKeep: "Continue assim!",
      cheerNext: "Na próxima você acerta!",
      toastPin: "Marcador colocado — toque em Adivinhar",
      toastTypeOrMap: "Digite uma cidade ou escolha no mapa",
      toastPinCleared: "Marcador removido",
      toastLoadFailed: "Não foi possível carregar o panorama",
      toastGuessFailed: "Não foi possível enviar o palpite",
      mapPin: "Marcador no mapa",
      unknown: "Desconhecido",
      errGeocoderBusy: "A busca está ocupada — aguarde um momento",
      errGeocoder: "Erro de busca ({status})",
      errPlaceNotFound: "Lugar não encontrado — tente outra grafia",
      errViewerConfig: "Não foi possível abrir o visualizador",
      errLoadLocation: "Não foi possível carregar este lugar",
      errNonPano: "Isto não é um panorama 360°",
      errViewer: "Erro do visualizador de panoramas",
      errSdk: "Falha ao carregar Mapillary ou MapLibre",
      errRound: "Não foi possível iniciar um novo panorama",
      errStartup: "Não foi possível iniciar o MapMapMaps. Tente novamente mais tarde.",
      sfxMute: "Silenciar",
      sfxUnmute: "Ativar som",
    },
    zh: {
      metaDescription: "MapMapMaps — 免费 GeoGuessr 风格游戏，基于 Mapillary 360° 街景。",
      pageTitle: "MapMapMaps — 猜地点",
      runLabel: "得分",
      progressAria: "游戏进度",
      stopOf: "全景 {n} / {total}",
      runComplete: "本局结束",
      stopCleared: "全景 {n} 完成",
      pts: "分",
      ptsTotal: "合计 {score}",
      distanceM: "相差 {d} 米",
      distanceKm1: "相差 {d} 公里",
      distanceKm: "相差 {d} 公里",
      milesParen: "（{d} 英里）",
      placeholderGuess: "城市或国家…",
      guess: "提交",
      newSpot: "换个地点",
      pickOnMap: "在地图上选点",
      closeMap: "关闭地图",
      streetView: "← 返回街景",
      dropPin: "在地图上放置标记",
      clearPin: "清除标记",
      yourGuess: "你的答案",
      actual: "实际地点",
      continue: "继续",
      nextStop: "下一张全景 →",
      finishRun: "结束本局",
      donate: "捐赠",
      donateTitle: "支持 MapMapMaps",
      gameComplete: "本局结束！",
      thisGame: "本局得分",
      personalBest: "个人最佳",
      playAgain: "再玩一次",
      firstComplete: "首次通关！",
      firstCompleteSub: "分数已保存在本设备。下次来打破它吧！",
      newBest: "新的个人纪录！",
      beatRecord: "你打破了之前 {score} 的纪录。",
      awayFromRecord: "距纪录还差 {diff} — 再试一次！",
      greatRun: "打得不错！还可以更高。",
      cheerPerfect: "完美！",
      cheerBrilliant: "太棒了！",
      cheerGreat: "很好！",
      cheerNice: "不错！",
      cheerKeep: "继续加油！",
      cheerNext: "下次一定行！",
      toastPin: "已放置标记 — 点击提交",
      toastTypeOrMap: "输入城市或在地图上选点",
      toastPinCleared: "已清除标记",
      toastLoadFailed: "无法加载全景",
      toastGuessFailed: "无法提交答案",
      mapPin: "地图标记",
      unknown: "未知",
      errGeocoderBusy: "搜索繁忙 — 请稍候",
      errGeocoder: "搜索错误 ({status})",
      errPlaceNotFound: "未找到地点 — 请换个写法试试",
      errViewerConfig: "无法打开全景查看器",
      errLoadLocation: "无法加载该地点",
      errNonPano: "这不是 360° 全景",
      errViewer: "全景查看器出错",
      errSdk: "Mapillary 或 MapLibre 加载失败",
      errRound: "无法开始新的全景",
      errStartup: "无法启动 MapMapMaps。请稍后再试。",
      sfxMute: "静音",
      sfxUnmute: "开启声音",
    },
    ja: {
      metaDescription: "MapMapMaps — Mapillary 360°の無料 GeoGuessr 風ゲーム。",
      pageTitle: "MapMapMaps — 場所当て",
      runLabel: "スコア",
      progressAria: "ゲームの進行状況",
      stopOf: "パノラマ {n} / {total}",
      runComplete: "ゲーム終了",
      stopCleared: "パノラマ {n} 完了",
      pts: "ポイント",
      ptsTotal: "合計 {score}",
      distanceM: "{d} メートル",
      distanceKm1: "{d} km",
      distanceKm: "{d} km",
      milesParen: "（{d} mi）",
      placeholderGuess: "都市または国…",
      guess: "回答する",
      newSpot: "別の場所",
      pickOnMap: "地図で選ぶ",
      closeMap: "地図を閉じる",
      streetView: "← ストリートに戻る",
      dropPin: "地図にピンを置く",
      clearPin: "ピンを消す",
      yourGuess: "あなたの回答",
      actual: "正解の場所",
      continue: "続ける",
      nextStop: "次のパノラマ →",
      finishRun: "ゲームを終える",
      donate: "寄付",
      donateTitle: "MapMapMaps を支援",
      gameComplete: "ゲーム終了！",
      thisGame: "今回のスコア",
      personalBest: "自己ベスト",
      playAgain: "もう一度遊ぶ",
      firstComplete: "初クリア！",
      firstCompleteSub: "スコアはこの端末に保存されます。次は上回ってみましょう！",
      newBest: "自己ベスト更新！",
      beatRecord: "前回の記録 {score} を更新しました。",
      awayFromRecord: "ベストまであと {diff} — もう一度挑戦！",
      greatRun: "いいゲームでした！まだまだ伸ばせます。",
      cheerPerfect: "パーフェクト！",
      cheerBrilliant: "素晴らしい！",
      cheerGreat: "よくできました！",
      cheerNice: "ナイス！",
      cheerKeep: "その調子！",
      cheerNext: "次は当たるはず！",
      toastPin: "ピンを置きました — 「回答する」を押してください",
      toastTypeOrMap: "都市を入力するか、地図で選んでください",
      toastPinCleared: "ピンを消しました",
      toastLoadFailed: "パノラマを読み込めませんでした",
      toastGuessFailed: "回答を送信できませんでした",
      mapPin: "地図のピン",
      unknown: "不明",
      errGeocoderBusy: "検索が混み合っています — 少し待ってください",
      errGeocoder: "検索エラー ({status})",
      errPlaceNotFound: "場所が見つかりません — 別の表記を試してください",
      errViewerConfig: "パノラマビューアを開けませんでした",
      errLoadLocation: "この場所を読み込めませんでした",
      errNonPano: "これは 360° パノラマではありません",
      errViewer: "パノラマビューアのエラー",
      errSdk: "Mapillary または MapLibre の読み込みに失敗しました",
      errRound: "新しいパノラマを開始できませんでした",
      errStartup: "MapMapMaps を開始できませんでした。後でもう一度お試しください。",
      sfxMute: "ミュート",
      sfxUnmute: "音声オン",
    },
    ko: {
      metaDescription: "MapMapMaps — Mapillary 360° 무료 GeoGuessr 스타일 게임.",
      pageTitle: "MapMapMaps — 장소 맞히기",
      runLabel: "점수",
      progressAria: "게임 진행도",
      stopOf: "파노라마 {n} / {total}",
      runComplete: "게임 완료",
      stopCleared: "파노라마 {n} 완료",
      pts: "점",
      ptsTotal: "합계 {score}",
      distanceM: "{d}미터",
      distanceKm1: "{d}km",
      distanceKm: "{d}km",
      milesParen: "({d} mi)",
      placeholderGuess: "도시 또는 나라…",
      guess: "제출",
      newSpot: "다른 장소",
      pickOnMap: "지도에서 선택",
      closeMap: "지도 닫기",
      streetView: "← 거리뷰로 돌아가기",
      dropPin: "지도에 핀을 놓으세요",
      clearPin: "핀 지우기",
      yourGuess: "내 답",
      actual: "실제 장소",
      continue: "계속",
      nextStop: "다음 파노라마 →",
      finishRun: "게임 끝내기",
      donate: "후원",
      donateTitle: "MapMapMaps 후원",
      gameComplete: "게임 완료!",
      thisGame: "이번 점수",
      personalBest: "개인 최고",
      playAgain: "다시 하기",
      firstComplete: "첫 완료!",
      firstCompleteSub: "점수는 이 기기에 저장됩니다. 다음엔 더 높은 점수를 노려보세요!",
      newBest: "개인 신기록!",
      beatRecord: "이전 기록 {score}을(를) 갱신했습니다.",
      awayFromRecord: "기록까지 {diff} 남음 — 다시 도전해 보세요!",
      greatRun: "좋은 게임이었어요! 더 높일 수 있습니다.",
      cheerPerfect: "완벽!",
      cheerBrilliant: "훌륭해요!",
      cheerGreat: "잘했어요!",
      cheerNice: "좋아요!",
      cheerKeep: "그 기세로!",
      cheerNext: "다음엔 맞출 거예요!",
      toastPin: "핀을 놓았어요 — 제출을 누르세요",
      toastTypeOrMap: "도시를 입력하거나 지도에서 선택하세요",
      toastPinCleared: "핀을 지웠어요",
      toastLoadFailed: "파노라마를 불러오지 못했습니다",
      toastGuessFailed: "답을 제출하지 못했습니다",
      mapPin: "지도 핀",
      unknown: "알 수 없음",
      errGeocoderBusy: "검색이 바쁩니다 — 잠시만 기다려 주세요",
      errGeocoder: "검색 오류 ({status})",
      errPlaceNotFound: "장소를 찾을 수 없습니다 — 다른 표기를 시도해 보세요",
      errViewerConfig: "파노라마 뷰어를 열 수 없습니다",
      errLoadLocation: "이 장소를 불러오지 못했습니다",
      errNonPano: "360° 파노라마가 아닙니다",
      errViewer: "파노라마 뷰어 오류",
      errSdk: "Mapillary 또는 MapLibre를 불러오지 못했습니다",
      errRound: "새 파노라마를 시작할 수 없습니다",
      errStartup: "MapMapMaps를 시작할 수 없습니다. 나중에 다시 시도해 주세요.",
      sfxMute: "음소거",
      sfxUnmute: "소리 켜기",
    },
  };

  const SUPPORTED = Object.keys(STRINGS);

  function matchLocale(raw) {
    if (!raw) return null;
    const tag = String(raw).toLowerCase();
    const base = tag.split("-")[0];
    if (STRINGS[base]) return base;
    if (base === "pt" || tag.startsWith("pt")) return "pt";
    if (base === "zh" || tag.startsWith("zh")) return "zh";
    return null;
  }

  function resolveLocale() {
    const stored = localStorage.getItem("mapmapmaps_locale_v1");
    if (stored && STRINGS[stored]) return stored;
    const list = navigator.languages?.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (const raw of list) {
      const m = matchLocale(raw);
      if (m) return m;
    }
    return "en";
  }

  let locale = resolveLocale();

  function t(key, vars) {
    const bag = STRINGS[locale] || STRINGS.en;
    let s = bag[key] ?? STRINGS.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return s;
  }

  function localeTag() {
    if (locale === "zh") return "zh-Hans";
    return locale;
  }

  function formatNumber(n) {
    try {
      return n.toLocaleString(localeTag());
    } catch {
      return String(n);
    }
  }

  /** Russian plural: 1 очко, 2–4 очка, 5+ очков (with teens exception). */
  function ruPlural(n, one, few, many) {
    const abs = Math.abs(Math.trunc(n));
    const mod10 = abs % 10;
    const mod100 = abs % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  function formatPoints(n) {
    const num = Math.abs(Number(n) || 0);
    const formatted = formatNumber(num);
    if (locale === "ru") {
      return `${formatted} ${ruPlural(num, "очко", "очка", "очков")}`;
    }
    if (locale === "en") {
      return `${formatted} ${num === 1 ? "point" : "points"}`;
    }
    if (locale === "de") {
      return `${formatted} ${num === 1 ? "Punkt" : "Punkte"}`;
    }
    if (locale === "es") {
      return `${formatted} ${num === 1 ? "punto" : "puntos"}`;
    }
    if (locale === "fr") {
      return `${formatted} ${num === 1 ? "point" : "points"}`;
    }
    if (locale === "pt") {
      return `${formatted} ${num === 1 ? "ponto" : "pontos"}`;
    }
    if (locale === "ja") {
      return `${formatted} ポイント`;
    }
    return `${formatted} ${t("pts")}`;
  }

  function formatMeters(n) {
    const num = Math.abs(Number(n) || 0);
    const rounded = Math.round(num);
    const formatted = formatNumber(rounded);
    if (locale === "ru") {
      return `${formatted} ${ruPlural(rounded, "метр", "метра", "метров")}`;
    }
    if (locale === "en") {
      return t("distanceM", { d: formatted });
    }
    return t("distanceM", { d: formatted });
  }

  function formatKilometers(n) {
    const num = Math.abs(Number(n) || 0);
    if (locale === "ru") {
      const rounded = num < 10 ? Math.round(num * 10) / 10 : Math.round(num);
      const formatted = formatNumber(rounded);
      // Fractions always take genitive singular: 1,5 километра
      if (!Number.isInteger(rounded)) {
        return `${formatted} километра`;
      }
      return `${formatted} ${ruPlural(rounded, "километр", "километра", "километров")}`;
    }
    if (num < 10) return t("distanceKm1", { d: formatNumber(Number(num.toFixed(1))) });
    return t("distanceKm", { d: formatNumber(Math.round(num)) });
  }

  function formatMilesParen(mi) {
    const rounded = mi < 10 ? Number(mi.toFixed(1)) : Math.round(mi);
    const formatted = formatNumber(rounded);
    if (locale === "ru") {
      if (!Number.isInteger(rounded)) {
        return `(${formatted} мили)`;
      }
      return `(${formatted} ${ruPlural(rounded, "миля", "мили", "миль")})`;
    }
    return t("milesParen", { d: formatted });
  }

  function applyStatic() {
    document.documentElement.lang = localeTag();
    const title = document.querySelector("title");
    if (title) title.textContent = t("pageTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("metaDescription"));

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const attr = el.getAttribute("data-i18n-attr");
      const val = t(key);
      if (attr) el.setAttribute(attr, val);
      else el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
  }

  global.MapMapMapsI18n = {
    t,
    locale,
    localeTag,
    formatNumber,
    formatPoints,
    formatMeters,
    formatKilometers,
    formatMilesParen,
    applyStatic,
    supported: SUPPORTED,
  };
})(window);
