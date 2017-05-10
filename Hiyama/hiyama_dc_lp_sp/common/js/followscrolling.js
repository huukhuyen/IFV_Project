/* Information
----------------------------------------------
File Name : followscrolling.js
URL : http://www.atokala.com/
Copyright : (C)atokala
Author : Masahiro Abe
--------------------------------------------*/
var ATFollowScrolling = function(vars) {
	var _self = this;

	//�f�t�H���g�I�v�V����
	var options = {
		duration : 500,
		delay : 0,
		interval : 0,
		animation : 'quinticOut',
		offset : 0,
		long: true
	};

	//�u���E�U�`�F�b�N
	var browser = {
		ua : function() {
			return navigator.userAgent;
		},
		//IE
		ie : function() {
			return browser.ua.indexOf('MSIE') >= 0;
		},
		//IE6
		ie6 : function() {
			return browser.ua.indexOf('MSIE 6') >= 0;
		},
		//�W�����[�h
		ieStandard : function() {
			return (document.compatMode && document.compatMode == 'CSS1Compat');
		}
	};

	//�X�N���[���ʒu�̎擾
	var scroll = {
		top : function() {
			return (document.documentElement.scrollTop || document.body.scrollTop);
		},
		left : function() {
			return (document.documentElement.scrollLeft || document.body.scrollLeft);
		},
		width : function() {
			if (browser.ie && !browser.ieStandard) {
				return document.body.scrollWidth;
			}
			//���_���u���E�U
			else {
				return document.documentElement.scrollWidth;
			}
		},
		height : function() {
			if (browser.ie && !browser.ieStandard) {
				return document.body.scrollHeight;
			}
			//���_���u���E�U
			else {
				return document.documentElement.scrollHeight;
			}
		}
	};

	//�E�C���h�E�̃T�C�Y�擾
	var inner = {
		width : function() {
			//���_��
			if (window.innerWidth) {
				return window.innerWidth;
			}
			//IE
			else if (browser.ie) {
				//IE6 && �W�����[�h
				if (browser.ie6 && browser.ieStandard) {
					return document.documentElement.clientWidth;
				}
				//IE6�݊����[�h && ��IE
				else {
					//IE6�ȉ�
					if (!document.documentElement.clientWidth) {
						return document.body.clientWidth;
					}
					//IE6�ȏ�
					else {
						return document.documentElement.clientWidth;
					}
				}
			}
		},
		height : function() {
			//���_��
			if (window.innerHeight) {
				return window.innerHeight;
			}
			//IE
			else if (browser.ie) {
				//IE6 && �W�����[�h
				if (browser.ie6 && browser.ieStandard) {
					return document.documentElement.clientHeight;
				}
				//IE6�݊����[�h && ��IE
				else {
					//IE6�ȉ�
					if (!document.documentElement.clientHeight) {
						return document.body.clientHeight;
					}
					//IE6�ȏ�
					else {
						return document.documentElement.clientHeight;
					}
				}
			}
		}
	};

	var easing = {
		/*
		time = ���ݕb (����
		begin = �ŏ��̒l
		change = �ϓ�����l
		duration = ���b�����ē�����
		*/
		liner : function(t, b, c, d) {
			return c * t / d + b;
		},
		quinticIn : function(t, b, c, d) {
			t /= d;
			return c * t * t * t * t * t + b;
		},
		quinticOut : function(t, b, c, d) {
			t /= d;
			t = t - 1;
			return -c * (t * t * t * t - 1) + b;
		}
	};

	//��������
	this.isNumber = function(num) {
		var num = parseInt(num);
		num = (!num)? 0 : num;

		return num;
	}

	//�I�v�V�����̏㏑���ݒ�
	this.config = function(property) {
		for (var i in property) {
			//�ݒ肳��Ă��Ȃ����͏㏑�����Ȃ�
			if (!vars.hasOwnProperty(i)) {
				continue;
			}
			options[i] = property[i];
		}
	}

	//�I�u�W�F�N�g�擾
	this.getElement = function(name) {
		if (name.indexOf('#') >= 0) {
			var id = name.replace('#', '');
			return document.getElementById(id);
		}
		else if (name.indexOf('.') >= 0) {
			var cl = name.replace('.', '');
			var tags = document.getElementsByTagName('*');
			var classes = this.getClass(cl, tags);
			return classes;
		}
	}

	//�I�u�W�F�N�g�ʒu�̎擾
	this.getElementPosition = function(ele) {
		var obj = new Object();
		obj.x = 0;
		obj.y = 0;

		while(ele) {
			obj.x += ele.offsetLeft || 0;
			obj.y += ele.offsetTop || 0;
			ele = ele.offsetParent;
		}
		return obj;
	}

	//CSS�擾
	this.getStyle = function(ele) {
		var style = ele.currentStyle || document.defaultView.getComputedStyle(ele, '');
		return style;
	}

	//Class�擾
	this.getClass = function(name, tags) {
		var classes = new Array();

		for(var i = 0; i < tags.length; i++) {
			var names = tags[i].className.split(/\s+/);

			for(var j = 0; j < names.length; j++) {
				if (names[j] == name) {
					classes.push(tags[i]);
				}
			}
		}
		return classes;
	}

	//ID�擾
	this.idSearch = function(name, tags) {
		for(var i = 0; i < tags.length; i++) {
			if (tags[i].id && tags[i].id.indexOf(name) >= 0) {
				return true;
			}
		}
		return false;
	}

	//�e�v�f�擾
	this.getParent = function(ele) {
		if (!options.parent) {
			return ele.parentNode;
		}
		else if (options.parent) {
			return document.getElementById(options.parent);
		}
	}

	//�q�v�f�擾
	this.getParents = function(ele) {
		var parent = ele.parentNode;
		var parents = new Array();

		while(parent) {
			parents.push(parent);
			parent = parent.parentNode;
		}

		return parents;
	}

	//�����擾
	this.getHeight = function(ele) {
		var style = this.getStyle(ele);
		var border = this.isNumber(style.borderTopWidth) + this.isNumber(style.borderBottomWidth);
		var height = ele.offsetHeight + border;

		return height;
	}

	//��ѐ�擾
	this.getPostion = function(ele) {
		var parent = this.getParent(ele);
		var maxHeight = this.getHeight(parent);
		var style = this.getStyle(ele);
		var height = this.getHeight(ele);

		//�E�C���h�E��荂�����Ⴂ�ꍇ
		if (height + this.isNumber(style.marginTop) + this.isNumber(style.marginBottom) + options.offset < inner.height() || !options.long) {
			ele.toY = scroll.top() + options.offset - ele.y;
		}
		//�E�C���h�E��荂���������ꍇ
		else {
			//��
			if (this.getElementPosition(ele).y - options.offset > scroll.top()) {
				ele.toY = scroll.top() + options.offset - ele.y;
			}
			//��
			else if (this.getElementPosition(ele).y + height + this.isNumber(style.marginTop) + this.isNumber(style.marginBottom) < scroll.top() + inner.height()) {
				ele.toY = scroll.top() + inner.height() - height - this.isNumber(style.marginTop) - this.isNumber(style.marginBottom) - ele.y;
			}
		}

		//���~�b�g�ݒ�(�e�v�f���)
		if (ele.toY < ele.top) {
			ele.toY = ele.top;
		}
		//���~�b�g�ݒ�(�e�v�f���)
		if (ele.toY > this.getElementPosition(parent).y + maxHeight - height - this.isNumber(style.marginTop) - this.isNumber(style.marginBottom) - ele.y) {
			ele.toY = this.getElementPosition(parent).y + maxHeight - height - this.isNumber(style.marginTop) - this.isNumber(style.marginBottom) - ele.y;
		}

		return ele.toY;
	}

	//�I�u�W�F�N�g�擾
	this.setAnimation = function(ele) {
		if (!this.isHeight(ele)) return false;

		var now = new Date();
		var fromY = this.isNumber(ele.style.top);
		var run = function() {
			var toY = _self.getPostion(ele);
			ele.timer = setTimeout(function() {
				var time = new Date() - now;
				var next = easing[options.animation](time, fromY, toY - fromY, options.duration);
				if (time < options.duration) {
					ele.style.top = next + 'px';
					ele.timer = setTimeout(function(){run();}, options.interval);
				}
				else {
					ele.style.top = toY + 'px';
					clearTimeout(ele.timer);
				}
			}, options.interval);
		}
		ele.timer = setTimeout(function(){run();}, options.interval);
	}

	//�I�u�W�F�N�g�擾
	this.setPosition = function(ele) {
		var toY = this.getPostion(ele);
		ele.style.top = toY + 'px';
	}

	//�ʒu�w��
	this.setValue = function(ele) {
		var isID = false;

		//�e�v�f�ݒ�
		if (options.parent) {
			var parents = this.getParents(ele);
			isID = this.idSearch(options.parent, parents)
		}
		//�e�v�f���ݒ�
		else {
			isID = true;
		}

		var style = this.getStyle(ele);
		var parent = this.getParent(ele);
		var parentStyle = this.getStyle(parent);
		ele.toY = 0;

		if (style.position == 'static' || style.position == 'relative') {
			ele.style.position = 'relative';
			ele.y = this.getElementPosition(parent).y;
			ele.top = this.isNumber(style.top);
			ele.style.top = this.isNumber(style.top) + 'px';
		}
		else if (style.position == 'absolute') {
			ele.style.position = 'absolute';

			//�e�v�f�ɃG�������g������ꍇ
			if (isID) {
				ele.y = this.getElementPosition(parent).y;
				ele.top = this.isNumber(style.top);
				ele.style.top = this.isNumber(style.top) + 'px';
			}
			//�e�v�f�ɃG�������g���Ȃ��ꍇ
			else {
				ele.y = 0;
				ele.top = this.getElementPosition(parent).y + this.isNumber(style.top);
				ele.style.top = this.getElementPosition(parent).y + this.isNumber(style.top) + 'px';
			}
		}
	}

	//�C�x���g�ݒ�
	this.setEvent = function(ele) {
		if (options.animation) {
			_self.setAnimation(ele);

			_self.addEvent(window, 'scroll', function() {
				clearTimeout(ele.timer);
				ele.timer = setTimeout(function(){
					clearTimeout(ele.timer);
					_self.setAnimation(ele);
				}, options.delay);
			});

			_self.addEvent(window, 'resize', function() {
				clearTimeout(ele.timer);
				ele.timer = setTimeout(function(){
					clearTimeout(ele.timer);
					_self.setAnimation(ele);
				}, options.delay);
			});
		}
		else {
			_self.setPosition(ele);

			_self.addEvent(window, 'scroll', function() {
				_self.setPosition(ele);
			});

			_self.addEvent(window, 'resize', function() {
				_self.setPosition(ele);
			});
		}
	}

	//�C�x���g����
	this.isHeight = function(ele) {
		var parent = _self.getParent(ele);
		var style = this.getStyle(parent);
		var maxHeight = _self.getHeight(parent) - _self.isNumber(style.paddingTop) - _self.isNumber(style.paddingBottom);
		var height = _self.getHeight(ele);

		//�E�C���h�E���I�u�W�F�N�g���������Ə������Ȃ�
		if (maxHeight < height) {
			return false;
		}

		return true;
	}

	//�C�x���g�ǉ�
	this.addEvent = function(target, name, func) {
		// ���_���u���E�U
		if(target.addEventListener) {
			target.addEventListener(name, func, false);
		}
		// IE
		else if(window.attachEvent) {
			target.attachEvent('on'+name, function(){func.apply(target);});
		}
	}

	this.load = function() {
		//�R���X�g���N�^
		this.config(vars);

		this.addEvent(window, 'load', function() {
			var ele = _self.getElement(options.element);
			if (!ele) return;

			//Class
			if (ele.length > 0) {
				for (var i=0; i<ele.length; i++) {
					var tag = ele[i];
					_self.setValue(tag);
					_self.setEvent(tag);
				}
			}
			//ID
			else {
				_self.setValue(ele);
				_self.setEvent(ele);
			}
		});
	}
};