
var _id;

// 阿斯嘉特入城前夕 - 城郊外的戰鬥前
_id = STORY.BEFORE_ENTER_ASGRARD_0 = 1;

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "- 阿斯嘉特近郊 -", 
	bgm: BGM_NONE, 
}));

adv_data.add(clone_hash(adv_template_talk_dai, {
	id: _id++, 
	next_scene_id: _id, 
	text: "「呼、呼…就在眼前了，阿斯嘉特…」", 
	bg: BG_ASGRARD, 
	bgm: BGM_FANTASY, 
	save_title: '前進阿斯嘉特',
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	text: "調整了一下呼吸、甩了甩槍尖上的鮮血，踏過了阻路者的殘骸，少女繼續朝向阿斯嘉特前進。", 
}));

adv_data.add(clone_hash(adv_template_talk_dai, {
	id: _id++, 
	next_scene_id: _id, 
	text: "「…不過，不大和平呢…」", 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	text: "名為妲伊的少女，握緊了手上的魔紋槍，踏著沉穩而堅定的腳步，銳利的眼神瞪向了前方新的阻路者。", 
}));

adv_data.add(clone_hash(adv_template_talk_dai, {
	id: _id++, 
	next_scene_id: ADV_END, 
	text: "「…來吧。嚐嚐擋在逐夢少女面前…是什麼下場！！」", 
	post_action: [
		{flag: F_START_STORY, }, 
	], 
}));

/*
adv_data.add(clone_hash(adv_template_talk_senbai, {
	id: _id++, 
	next_scene_id: _id, 
	text: "呼呼呼…新來的，按往例，週五的[tip:2]才藝[:]表演可別忘了[tip:1]愉悅愉悅[:]大家啊。", 
	bg: BG_TPE101, 
	bgm: BGM_FANTASY, 
	image: [
		clone_hash(IMAGE_SENBAI, IMAGE_POS_MID, {id: 1, }), 
	], 
	save_title: '初入秘境',
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "咦咦！？可、可是，才藝什麼的、我…", 
}));

adv_data.add(clone_hash(adv_template_branch, {
	id: _id++, 
	option: [
	{
		text: '我可沒有東西可以表演！', 
		next_scene_id: _BRANCH_NOT_TO_SHOW, 
	}, 
	{
		text: '我不知道我能做什麼？', 
		next_scene_id: _BRANCH_NOTHING_TO_SHOW, 
	}, 
	], 
	save_title: '命運的分歧', 
}));

_id = _BRANCH_NOT_TO_SHOW;

adv_data.add(clone_hash(adv_template_talk_senbai, {
	id: _id++, 
	next_scene_id: _id, 
	cg: CG_ATHENA, 
	text: "啊哈哈，你在說什麼呢新人，你才不是一無所有呢！\n你不是還有[tip:3]生命[:]嗎？", 
	save_title: '無才錯了嗎', 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	cg: CG_NONE, 
	image: [
		clone_hash(IMAGE_SENBAI, IMAGE_POS_LEFT, {id: 2, }), 
		clone_hash(IMAGE_SENBAI, IMAGE_POS_RIGHT, {id: 3, }), 
	], 
	text: "咦？…等等，你們想讓我做什…不、不行，別過來啊啊啊啊─\n※此為戲劇效果，[color:#FF3030]嚴禁模仿[:]", 
}));

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "你已經死了", 
	sub_title: "- BAD END -", 
	bgm: BGM_NONE, 
}));

_id = _BRANCH_NOTHING_TO_SHOW;

adv_data.add(clone_hash(adv_template_talk_senbai, {
	id: _id++, 
	next_scene_id: _id, 
	text: "嘿嘿，這還不簡單！\n找件快樂的事娛樂大家不就成了？", 
	save_title: '無才之道', 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "嗯…快樂的事…嗎。動漫、小說、遊戲…\n我知道了，果然是[tip:4]幻想[:]對吧！", 
}));

adv_data.add(clone_hash(adv_template_fate, {
	id: _id++, 
	branch: [
	{
		condition: {
			not_global_flag: _F_DEATH, 
		}, 
		next_scene_id: _FATE_DEATH, 
	}, 
	{
		next_scene_id: _FATE_FLAG, 
	}, 
	], 
}));

_id = _FATE_DEATH;

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "T.G.I.F.", 
	sub_title: "- Noogler Talent Show -", 
	bgm: BGM_NONE, 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "今天我將為大家帶來最歡樂最精彩的故事！", 
	image: [
		clone_hash(IMAGE_SEER, IMAGE_POS_MID, {id: 1, }), 
	], 
	save_title: '醉於幻想', 
}));

adv_data.add(clone_hash(adv_template_talk_seer, {
	id: _id++, 
	next_scene_id: _id, 
	text: "喔喔喔喔喔喔！！", 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "那麼…最強的幻想、開始了！！", 
	bgm: BGM_BATORU, 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	text: "於是我閉上眼睛，深呼吸了一下，便開始了幻想…", 
}));

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "三小時後…", 
	sub_title: "(T.G.I.F.已解散)", 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	image: IMAGE_CLEAR_ALL, 
	text: "呼…完結了！真是太精彩了，簡直就是神作中的神…\n咦？人呢？…只剩桌上留著一張紙條？", 
	bgm: BGM_NONE, 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	text: "「To 沙耶: \n  看你一臉陶醉樣，實在不便打擾，但我們沒辦法看到你腦中的世界，實在無法感受它的樂趣。  - 觀眾」", 
	bgm: BGM_FANTASY, 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "這…這是何等的失態…！是了！不將它具現化的話…我…", 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "如果…可以用我的生命，在此立下FLAG阻止同樣的悲劇再次發生…", 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	text: "說著邊拉開了窗戶…\n※此為戲劇效果，[color:#FF3030]誓不表演[:]\n※就算觀眾要求也[color:#FF3030]不會應[:]的\n", 
	post_action: [
		{global_flag: _F_DEATH, }, 
	], 
}));

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "你已經死了", 
	sub_title: "- 但旗也真的立了，可喜可賀 -", 
	bgm: BGM_NONE, 
}));

_id = _FATE_FLAG;

adv_data.add(clone_hash(adv_template_branch, {
	id: _id++, 
	option: [
	{
		text: '那就表演幻想吧！', 
		next_scene_id: _FATE_DEATH, 
	}, 
	{
		text: '那就把幻想具現化吧！', 
		next_scene_id: _id, 
	}, 
	], 
	save_title: '小旗立大功', 
}));

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "T.G.I.F.", 
	sub_title: "- Noogler Talent Show -", 
	bgm: BGM_NONE, 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	image: [
		clone_hash(IMAGE_SEER, IMAGE_POS_MID, {id: 1, }), 
	], 
	text: "今天我將為大家帶來最歡樂最精彩的故事！透過這台筆電！！", 
	save_title: '空想具現', 
	bgm: BGM_BATORU, 
}));

adv_data.add(clone_hash(adv_template_talk_seer, {
	id: _id++, 
	next_scene_id: _id, 
	text: "喔喔喔喔喔喔！！", 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	cg: CG_ARCUEID, 
	text: "看我的『[tip:5]空想具現[:]』！！", 
}));

adv_data.add(clone_hash(adv_template_talk_seer, {
	id: _id++, 
	next_scene_id: _id, 
	text: "這、這是…", 
}));

adv_data.add(clone_hash(adv_template_talk_seer, {
	id: _id++, 
	next_scene_id: _id, 
	cg: CG_BLOCKER, 
	text: "何等[color:red]亂七八糟[:]的[color:red]羞恥[:]幻想啊！快、快給我停下 (暴怒)", 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	cg: CG_NONE, 
	image: [
		clone_hash(IMAGE_SEER, IMAGE_POS_LEFT, {id: 2, }), 
		clone_hash(IMAGE_SEER, IMAGE_POS_RIGHT, {id: 3, }), 
	], 
	text: "觀眾狂暴化了！觀眾開始投擲物件了！\n※此為戲劇效果，[color:#FF3030]嚴禁模仿[:]", 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	text: "※此為戲劇效果，[color:#FF3030]嚴禁模仿[:]\n※因為很[color:#FF3030]重要[:]所以要說兩次", 
}));

adv_data.add(clone_hash(adv_template_talk_saya, {
	id: _id++, 
	next_scene_id: _id, 
	text: "這、這明明如此的[color:#FF3030]藝術[:]…嗚喔痛痛痛痛…", 
}));

adv_data.add(clone_hash(adv_template_chapter, {
	id: _id++, 
	next_scene_id: _id, 
	main_title: "你已經死了", 
	sub_title: "- 但也沒戲了！全劇終 -", 
}));

adv_data.add(clone_hash(adv_template_talk_none, {
	id: _id++, 
	next_scene_id: _id, 
	image: IMAGE_CLEAR_ALL, 
	text: "                       - 以下開放趁亂告白 -", 
	bgm: BGM_NONE, 
}));
*/
