#pragma strict

var target : Transform;

function Start () {

}

function Update () {
	var followOffset = target.position;
	followOffset += target.up * 3;
	followOffset += target.forward * -10;
	
	transform.position = followOffset;
}

function LateUpdate() {
	// transform.LookAt(target);
	transform.LookAt(target, target.up);
}