//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////





class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    
    private user : User ;
    private hero : Hero;
    private sword : Weapon;
    private helment : Armor;
    private corseler : Armor;
    private shoes : Armor;
    private weaponJewel : Jewel;
    private armorJewel : Jewel;

    private userPanel : UserPanel;
    //private equipmentInformationPanel : EquipmentInformationPanel;

    
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        // this.Stage01Background = this.createBitmapByName("BackGround_jpg");
        // this.addChild(this.Stage01Background);
        // this.Stage01Background.width = stageH * 3.1;
        // this.Stage01Background.height = stageH;
        // this.Stage01Background.x = -stageH * 3.1 / 2;
        // this.Stage01Background.y = 0;

         this.user = new User("Player01",1);
         this.hero = new Hero("H001","FemaleSaberHero01",Quality.ORAGE,1,"NPC_png",HeroType.SABER);
         this.sword = new Weapon("W001","Leagendsword01",Quality.ORAGE,WeaponType.HANDSWORD,"weapon_jpg");
         this.helment = new Armor("A001","Purplrhelment01",Quality.PURPLE,ArmorType.LIGHTARMOR,"head_jpg");
         this.corseler = new Armor("A002","GreenCorseler01",Quality.GREEN,ArmorType.LIGHTARMOR,"armor_jpg");
         this.shoes = new Armor("A003","BlueShoes01",Quality.BLUE,ArmorType.LIGHTARMOR,"BlueShoes01_jpg");
         this.weaponJewel = new Jewel(Quality.ORAGE);
         this.armorJewel = new Jewel(Quality.WHITE);
         
         this.sword.addJewl(this.weaponJewel);
         this.helment.addJewl(this.armorJewel);
         this.corseler.addJewl(this.armorJewel);
         this.shoes.addJewl(this.armorJewel);
         this.hero.addWeapon(this.sword);
         this.hero.addHelment(this.helment);
         this.hero.addCorseler(this.corseler);
         this.hero.addShoes(this.shoes);
         this.user.addHeroInTeam(this.hero);
         this.user.addHeros(this.hero);

        //  console.log(this.user.getFightPower());
        //  console.log(this.hero.getAttack());
        //  console.log(this.hero.getDefence());
        //  console.log(this.hero.getAglie());
        //  console.log(this.hero.getMaxHP());
        //  console.log("weaponJewel fightpower :" + this.weaponJewel.getFightPower().toFixed(0));
        //  console.log("armorJewel fightpower :" + this.armorJewel.getFightPower().toFixed(0));
        //  console.log("sword fightpower :" + this.sword.getFightPower().toFixed(0));
        //  console.log("helment fightpower :" + this.helment.getFightPower().toFixed(0));
        //  console.log("helment defence :" + this.helment.getDefence().toFixed(0));
        //  console.log("helment aglie :" + this.helment.getAglie().toFixed(0));
        //  console.log("hero fightpower :" + this.hero.getFightPower().toFixed(0));

         this.userPanel = new UserPanel();
         this.addChild(this.userPanel);
         this.userPanel.showHeroInformation(this.hero);
         this.userPanel.x = (this.stage.width - this.userPanel.width) / 2;
         this.userPanel.y = (this.stage.height - this.userPanel.height) / 2;

         //this.equipmentInformationPanel = new EquipmentInformationPanel();
         this.userPanel.equipmentInformationPanel.showEquipmentInformation(this.sword);
         //this.addChild(this.userPanel.equipmentInformationPanel);


         

         
       

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description_json", this.startAnimation, this)
            
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


