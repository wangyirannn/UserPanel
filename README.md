用户体系构架：用户->英雄->装备（分武器与防具）->宝石

User（用户） ：{
    基础属性：
        userName（用户姓名） : string
        level（用户等级） : number
        currentExp（当前经验值） : number
        diamonds（钻石） : number
        gold（金币） : number

    高级属性：
        totalExp（当前等级的经验值上限） ：totalExp = (level + 60) * level;
    }

Hero（英雄）：{
    基础属性：
        name（姓名） : string;
        quality（品质）  ： Quality
        level（等级） ： number
        currentExp（当前经验值） ： number

    高级属性：
        totalExp（当前等级的经验值上限） ：totalExp = (level + 50) * level

        MaxHP（英雄最大生命值）： 英雄装备所有武器的战斗力之和 * 0.2 + 英雄装备所有防具的战斗力之和 * 0.8 + 当前等级 * 英雄的品质 *　10 

        attack（英雄攻击力）： 英雄装备武器攻击力之和 * 0.5 + 当前等级 * 英雄的品质 *　5

        defence（英雄防御力）： 英雄装备所有防具防御力之和 * 0.2 + 当前等级 * 英雄的品质 *　2

        aglie（英雄敏捷值）： 英雄装备武器敏捷值之和 * 0.4 + 英雄装备所有防具的敏捷值之和 * 0.4 + 当前等级 * 英雄的品质 *　4

        fightPower（英雄战斗力）： 英雄装备所有武器战斗力之和 + 英雄装备所有防具战斗力之和 + （10 + 英雄攻击力 * 10 + 英雄防御力 * 8 + 英雄敏捷值 * 6） * 英雄等级 * 英雄品质

}

Weapon（武器）：{
    基础属性：
        name（武器名称） : string;
        quality（品质）  ： Quality
        weaponType（武器种类） ： WeaponType

    高级属性：
        attack（武器攻击力） ： 武器装备宝石战斗力之和 * 0.4 + 10　* 武器类型 * 武器品质
        aglie（武器敏捷）：武器装备宝石战斗力之和 * 0.4 + 5 * 武器品质 / 武器类型
        fightPower（武器战斗力） ： 武器装备宝石战斗力之和 + （武器攻击力 * 10 + 武器敏捷值 * 5） * 武器品质
}

Armor（防具）：{
    基础属性：
        name（防具名称） : string;
        quality（品质）  ： Quality
        armorType（防具种类） ： ArmorType

    高级属性：
        attack（防具攻击力） ： 防具装备宝石战斗力之和 * 0.4 + 6　* 防具类型 * 防具品质
        aglie（防具敏捷）：防具装备宝石战斗力之和 * 0.4 + 5 * 防具品质 / 防具类型
        fightPower（防具战斗力） ： 防具装备宝石战斗力之和 + （防具攻击力 * 10 + 防具敏捷值 * 5） * 防具品质
}

Jewel（宝石）{
    基础属性：
        quality（品质）  ： Quality

    高级属性：
        fightPower（宝石战斗力） ： 宝石品质 * 10
}