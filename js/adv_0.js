
var ADV_END = 0;

var STORY = {};

var ADV_DISPLAY = {
	DIALOG: 1, 
	CHANGE_CHAPTER: 2, 
	BRANCH: 3, 
	FATE: 4, 
};

var ADV_BG = {
	NONE: 0, 
	INHERIT: 1, 
	IMAGE: 2, 
};

var ADV_CG = {
	NONE: 0, 
	INHERIT: 1, 
	IMAGE: 2, 
};

var ADV_BGM = {
	NONE: 0, 
	INHERIT: 1, 
	PLAY: 2, 
};

var ADV_IMAGE = {
	NONE: 0, 
	INHERIT: 1, 
	SHOW: 2, 
	CHANGE_ATTR: 3, 
};

var BG_NONE = {
	display: ADV_BG.NONE, 
};

var BG_INHERIT = {
	display: ADV_BG.INHERIT, 
};

var BG_ASGARD = {
	display: ADV_BG.IMAGE, 
	image: 'ASGARD', 
};

var CG_NONE = {
	display: ADV_CG.NONE, 
};

var CG_INHERIT = {
	display: ADV_CG.INHERIT, 
};

var CG_DOG_DAYS = {
	display: ADV_CG.IMAGE, 
	image: 'CG_DOG_DAYS', 
};

var BGM_NONE = {
	display: ADV_BGM.NONE, 
};

var BGM_INHERIT = {
	display: ADV_BGM.INHERIT, 
};

var BGM_FANTASY = {
	display: ADV_BGM.PLAY, 
	loop: true, 
	audio: 'BGM_FANTASY', 
};

var IMAGE_BASE = {
	display: ADV_IMAGE.SHOW, 
	bottom: '0px', 
};

var IMAGE_TEREA = clone_hash(IMAGE_BASE, {
	image: 'IMAGE_TEREA', 
	height: '500px', 
});

var IMAGE_POS_BASE = {
};

var IMAGE_POS_LEFT = clone_hash(IMAGE_POS_BASE, {
	left: '60px', 
});

var IMAGE_POS_RIGHT = clone_hash(IMAGE_POS_BASE, {
	left: '660px', 
});

var IMAGE_POS_MID = clone_hash(IMAGE_POS_BASE, {
	left: '360px', 
});

var IMAGE_CLEAR = {
	display: ADV_IMAGE.NONE, 
};

var IMAGE_CLEAR_ALL = [
	clone_hash(IMAGE_CLEAR, {id: 1, }), 
	clone_hash(IMAGE_CLEAR, {id: 2, }), 
	clone_hash(IMAGE_CLEAR, {id: 3, }), 
	clone_hash(IMAGE_CLEAR, {id: 4, }), 
	clone_hash(IMAGE_CLEAR, {id: 5, }), 
	clone_hash(IMAGE_CLEAR, {id: 6, }), 
	clone_hash(IMAGE_CLEAR, {id: 7, }), 
	clone_hash(IMAGE_CLEAR, {id: 8, }), 
	clone_hash(IMAGE_CLEAR, {id: 9, }), 
];

var adv_template_base = {
	id: -1, 
};

var adv_template_branch = clone_hash(adv_template_base, {
	display: ADV_DISPLAY.BRANCH, 
});

var adv_template_fate = clone_hash(adv_template_base, {
	display: ADV_DISPLAY.FATE, 
});

var adv_template_chapter = clone_hash(adv_template_base, {
	text: "", 
	display: ADV_DISPLAY.CHANGE_CHAPTER, 
});

var adv_template_talk = clone_hash(adv_template_base, {
	text: "", 
	display: ADV_DISPLAY.DIALOG, 
});

var adv_template_talk_none = clone_hash(adv_template_talk, {
	name: "", 
});

var adv_template_talk_other = clone_hash(adv_template_talk, {
});

var adv_template_talk_dai = clone_hash(adv_template_talk, {
	name: "妲伊", 
});

var adv_template_talk_terea = clone_hash(adv_template_talk, {
	name: "忒蕾雅", 
});
